'use strict'
const { includeCompany } = require('../../Helpers/request')
const Controller = use('App/Controllers/Http/Controller')
const UserService = use('App/Services/UserService')
const UserTransformer = use('App/Transformers/User')
const TaskService = use('App/Services/TaskService')
const CompanyService = use('App/Services/CompanyService')
const moment = require('moment')
const UserTaskTransformer = use('App/Transformers/UserTask')
const FileUploadHandler = use('App/Services/FileUploads/Handler')
const UploadHelper = use('App/Helpers/UploadHelper')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController extends Controller {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response, auth }) {
    await includeCompany(request, auth, 'filters', 'companies.company_id')

    const users = await UserService.getAll(request.get())

    return this.success(response, await UserTransformer.asyncPaginate(users), 'OK', this.makePaginateMeta(users))
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const payload = request.only([
      'name',
      'code',
      'nickname',
      'username',
      'email',
      'password',
      'active',
      'company_id',
      'role_id',
      'employee_type',
      'start_date',
      'last_working_date',
      'salary',
      'is_approver',
      'department_id'
    ])

    // Handle file upload
    let files
    if (request.file('file')) {
      try {
        files = await this.getFile(request)
      } catch (e) {
        return response.status(422).send(e)
      }
    }

    const user = await UserService.create(payload, files)

    return this.success(response, await UserTransformer.asyncMake(user))
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response, request }) {
    const user = await UserService.getUserById(params.id, request.get())

    return this.success(response, await UserTransformer.asyncMake(user))
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const userId = params.id
    const payload = request.only([
      'username',
      'email',
      'password',
      'active',
      'company_id',
      'name',
      'code',
      'nickname',
      'role_id',
      'employee_type',
      'start_date',
      'last_working_date',
      'salary',
      'is_approver',
      'department_id'
    ])

    // Handle file upload
    let files
    if (request.file('file')) {
      try {
        files = await this.getFile(request)
      } catch (e) {
        return response.status(422).send(e)
      }
    }

    try {
      const user = await UserService.update(userId, payload, files)

      return this.success(response, await UserTransformer.asyncMake(user), 'Update user success')
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Update user error'
      )
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      await UserService.delete(params.id)
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Delete user error'
      )
    }

    return this.success(response, null, 'Delete user success')
  }

  /**
   * Get logged in user
   * GET users/me
   *
   * @param auth
   * @param response
   * @returns {Promise<void>}
   */
  async me({ auth, response, request }) {
    if (auth.user.active !== 1) {
      return this.fail(response, null, 'ไม่สามารถเข้าใช้งานได้')
    }

    const params = {
      includes: 'companies,employee,roles.permissions,profile_picture,departments'
    }

    const user = await UserService.getUserById(auth.user.id, params)

    return this.success(response, await UserTransformer.asyncMake(user))
  }

  /**
   * Get user tasks
   * GET users/tasks
   *
   * @param auth
   * @param response
   * @returns {Promise<void>}
   */
  async tasks({ auth, request, response }) {
    const { company_id: companyId, current_date = '' } = request.all()

    const employee = await auth.user.employee().fetch()

    let currentDateTime = current_date
    if (!currentDateTime) {
      currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let tasks
    let taskDate
    let expiresDate
    try {
      tasks = await TaskService.getEmployeeTasks(employee.id, companyId, currentDateTime)

      taskDate = await CompanyService.getReallyTaskDate(companyId, moment(currentDateTime))

      expiresDate = await CompanyService.getReallyExpiresDate(companyId, moment(currentDateTime))
    } catch (e) {
      return this.fail(response, null, e.message)
    }

    return this.success(response, UserTaskTransformer.collection(tasks), '', {
      taskDate,
      expiresDate
    })
  }

  async updateProfile({ auth, request, response }) {
    const userId = auth.user.id
    const payload = request.only(['email', 'password', 'name'])

    // Handle file upload
    let files
    if (request.file('file')) {
      try {
        files = await this.getFile(request)
      } catch (e) {
        return response.status(422).send(e)
      }
    }

    let user
    try {
      await UserService.updateProfile(userId, payload, files)

      user = await UserService.getUserById(userId, request.get())
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Update user error'
      )
    }

    return this.success(response, await UserTransformer.asyncMake(user), 'Update user success')
  }

  async getFile(request) {
    const handler = new FileUploadHandler(request, 'file', UploadHelper.getValidation('any'))

    await handler.process()

    return handler.getFiles()
  }
}

module.exports = UserController
