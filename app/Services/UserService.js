const _ = require('lodash')
const moment = require('moment')
const Service = use('App/Services/Service')
const TaskTransactionService = use('App/Services/TaskTransactionService')
const User = use('App/Models/User')
const Database = use('Database')
const isArray = require('lodash/isArray')
const { isInclude } = require('../Helpers/string')

class UserService extends Service {
  static async getAll(params, exceptIds = null) {
    const { page, perPage, includes = '', isLoadExpUser = '' } = params
    delete params.isLoadExpUser
    const model = User.parseQuery(params)
    model.select('users.*')

    model.join('role_user', 'role_user.user_id', 'users.id')
    model.join('roles', 'role_user.role_id', 'roles.id')
    model.where('roles.slug', '!=', 'super_admin')

    if (isLoadExpUser.toLowerCase() === 'true') {
      model.whereHas('employee', builder => {
        builder.where('employees.last_working_date', '<=', moment().format('YYYY-MM-DD HH:mm'))
      })
    } else if (isLoadExpUser.toLowerCase() === 'false') {
      model.whereHas('employee', builder => {
        builder.where(function() {
          this.where('employees.last_working_date', '>', moment().format('YYYY-MM-DD HH:mm')).orWhereNull(
            'last_working_date'
          )
        })
      })
    }

    if (params.company_id) {
      model.join('company_user', 'company_user.user_id', 'users.id')
      model.where('company_user.company_id', params.company_id)
    }

    if (isArray(exceptIds)) {
      model.whereNotIn('users.id', exceptIds)
    }

    if (isInclude(includes, 'profile_picture')) {
      this.withMedia(model, 'profile_picture', 'App/Models/User', 'profile_picture')
    }

    const users = await model.paginate(page, perPage)

    return users.toJSON()
  }

  static async getById(id, params = []) {
    const user = await User.findOrFail(id)

    return user.toJSON()
  }

  static async getUserById(id, params = []) {
    const { includes = '' } = params

    const query = User.parseQuery(params).where('id', id)

    if (isInclude(includes, 'profile_picture')) {
      this.withMedia(query, 'profile_picture', 'App/Models/User', 'profile_picture')
    }

    const user = await query.first()

    return user.toJSON()
  }

  static async create(payload, files = null) {
    // Start transaction
    const trx = await Database.beginTransaction()

    let user
    try {
      user = await User.create(_.pick(payload, ['username', 'email', 'password', 'active', 'is_approver']))

      // Create employee
      await user.employee().create({
        name: payload.name,
        code: payload.code,
        nickname: payload.nickname,
        employee_type: payload.employee_type,
        start_date: payload.start_date,
        last_working_date: payload.last_working_date,
        salary: payload.salary
      })

      // Create user companies
      if (payload.company_id) {
        await user.companies().attach(payload.company_id)
      }

      if (payload.department_id) {
        await user.departments().attach(payload.department_id)
      }

      // Sync roles
      await this.sync(user.roles(), [payload.role_id])

      // Profile picture
      if (files) {
        await user.addMedia(files, 'profile_picture')
      }

      // Commit transaction
      trx.commit()
    } catch (e) {
      trx.rollback()

      throw e
    }

    return this.getUserById(user.id, {
      includes: 'employee.designations,companies,roles,profile_picture,departments'
    })
  }

  static async update(id, payload, files = null) {
    const user = await User.findOrFail(id)

    user.merge(_.pick(payload, ['username', 'email', 'active', 'is_approver']))
    if (payload.password && payload.password.length) {
      user.password = payload.password
    }
    await user.save()

    // Update employee
    if (payload.name) {
      await user.employee().update({
        name: payload.name,
        code: payload.code,
        nickname: payload.nickname,
        employee_type: payload.employee_type,
        start_date: payload.start_date,
        last_working_date: payload.last_working_date,
        salary: payload.salary
      })
    }

    // Update user companies
    if (payload.company_id) {
      const companies = await user.companies().fetch()
      const existsCompanyIds = companies.toJSON().map(item => {
        return item.id
      })
      const willDeleteCompanyIds = _.difference(existsCompanyIds, payload.company_id)
      await user.companies().detach(willDeleteCompanyIds)
      await user.companies().attach(payload.company_id)
    }

    // Sync roles
    await this.sync(user.roles(), [payload.role_id])

    //Sync departments
    if (payload.department_id) {
      await user.departments().sync(payload.department_id)
    } else {
      await user.departments().sync([])
    }

    // Profile picture
    if (files) {
      await user.editMedia(files, 'profile_picture')
    }

    return this.getUserById(id, {
      includes: 'employee.designations,companies,roles,profile_picture,departments'
    })
  }

  static async delete(id) {
    const user = await User.findOrFail(id)
    await user.load('employee')
    if (user.getRelated('employee')) {
      await user.getRelated('employee').delete()
    }

    const result = await user.delete()

    return result
  }

  static async getByUsername(username) {
    const user = await User.query()
      .where('username', username)
      .first()

    return user.toJSON()
  }

  static async updateProfile(id, payload, files = null) {
    const user = await User.findOrFail(id)

    user.merge(_.pick(payload, ['email']))
    if (payload.password) {
      user.password = payload.password
    }
    await user.save()

    // Update employee
    if (payload.name) {
      await user.employee().update({
        name: payload.name
      })
    }

    // Profile picture
    if (files) {
      await user.editMedia(files, 'profile_picture')
    }

    await user.load('employee')
    await user.load('companies')

    return user.toJSON()
  }

  static async getByPermissions(permissions = [], companyId = null) {
    let users
    if ((!permissions || !permissions.length) && !companyId) {
      users = await User.all()
    } else {
      // Filter by both permissions and company
      if (permissions && permissions.length && companyId) {
        const query = User.query()
          .whereHas('roles.permissions', builder => {
            builder.whereIn('slug', permissions)
          })
          .whereHas('companies', builder => {
            builder.where('companies.id', companyId)
          })

        users = await query.fetch()
      } else if (permissions && permissions.length) {
        // Filter only permissions
        const query = User.query().whereHas('roles.permissions', builder => {
          builder.whereIn('slug', permissions)
        })
        users = await query.fetch()
      } else {
        // Filter only company
        const query = User.query().whereHas('companies', builder => {
          builder.where('companies.id', companyId)
        })

        users = await query.fetch()
      }
    }

    return users.toJSON()
  }

  static async reCalculateTaskStar(userId) {
    const user = await User.query()
      .with('employee')
      .where('id', userId)
      .first()
    const userJSON = user.toJSON()

    user.star = await TaskTransactionService.getSummaryStarByEmployeeId(userJSON.employee.id)

    await user.save()
  }

  static async getUserCompanyById(id, company_id) {
    const query = User.query()
    query.where('id', id).with('companies', builder => {
      builder.where('companies.id', company_id)
    })

    return query.first()
  }
}

module.exports = UserService
