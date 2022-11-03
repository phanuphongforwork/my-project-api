const _ = require('lodash')
const Service = use('App/Services/Service')
const Company = use('App/Models/Company')
const {
  ModelNotFoundException
} = require('@adonisjs/lucid/src/Exceptions/index')
const moment = require('moment')

class CompanyService extends Service {
  static async getAll(params) {
    const {
      page,
      perPage
    } = params
    const model = Company.parseQuery(params)
    const companies = await model.paginate(page, perPage)

    return companies.toJSON()
  }

  static async getById(id, params = []) {
    const company = await Company.parseQuery(params)
      .where('id', id)
      .first()

    if (!company) {
      throw new ModelNotFoundException(
        'E_MISSING_DATABASE_ROW: Cannot find database row for Company model\n> More details: https://err.sh/adonisjs/errors/E_MISSING_DATABASE_ROW'
      )
    }

    return company.toJSON()
  }

  static async create(payload) {
    if (payload.cut_off_time === '00:00') {
      payload.cut_off_time = '24:00:00'
    } else {
      payload.cut_off_time = payload.cut_off_time + ':00'
    }

    const company = await Company.create(payload)

    return company.toJSON()
  }

  static async update(id, payload) {
    if (payload.cut_off_time === '00:00') {
      payload.cut_off_time = '24:00:00'
    } else {
      payload.cut_off_time = payload.cut_off_time + ':00'
    }

    const company = await Company.findOrFail(id)

    company.merge(payload)
    await company.save()

    return company
  }

  static async delete(id) {
    const company = await Company.findOrFail(id)
    const result = await company.delete()

    return result
  }

  static async getReallyTaskDate(companyId, dateObj, includeTime = false) {
    const company = await Company.findOrFail(companyId)
    const midnightDate = dateObj.format('YYYY-MM-DD 00:00:00')

    const greaterThanMidNightCondition =
      dateObj.diff(moment(midnightDate), 'seconds') >= 0
    const lessThanCutOffTimeCondition =
      moment(dateObj.format('YYYY-MM-DD ' + company.cut_off_time)).diff(
        dateObj,
        'seconds'
      ) >= 0

    if (
      greaterThanMidNightCondition &&
      lessThanCutOffTimeCondition &&
      company.over_night === 1
    ) {
      return dateObj.subtract(1, 'days').format('YYYY-MM-DD')
    } else {
      if (
        dateObj.diff(
          moment(dateObj.format('YYYY-MM-DD ' + company.cut_off_time)),
          'seconds'
        ) > 0 &&
        company.over_night !== 1
      ) {
        return dateObj.add(1, 'days').format('YYYY-MM-DD')
      }
    }

    const format = includeTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'

    return dateObj.format(format)
  }

  static async getReallyExpiresDate(companyId, dateObj) {
    const company = await Company.findOrFail(companyId)

    const midnightDate = dateObj.format('YYYY-MM-DD 00:00:00')

    const greaterThanMidNightCondition =
      dateObj.diff(moment(midnightDate), 'seconds') >= 0
    const lessThanCutOffTimeCondition =
      moment(dateObj.format('YYYY-MM-DD ' + company.cut_off_time)).diff(
        dateObj,
        'seconds'
      ) >= 0

    if (
      greaterThanMidNightCondition &&
      lessThanCutOffTimeCondition &&
      company.over_night === 1
    ) {
      return dateObj.format('YYYY-MM-DD ' + company.cut_off_time)
    } else {
      if (
        dateObj.diff(
          moment(dateObj.format('YYYY-MM-DD ' + company.cut_off_time)),
          'seconds'
        ) > 0 &&
        company.over_night !== 1
      ) {
        return dateObj
          .add(1, 'days')
          .format('YYYY-MM-DD ' + company.cut_off_time)
      } else {
        if (company.over_night === 1) {
          return dateObj
            .add(1, 'days')
            .format('YYYY-MM-DD ' + company.cut_off_time)
        }
      }
    }

    return dateObj.format('YYYY-MM-DD ' + company.cut_off_time)
  }

  static async getAmountReportSummary(companyId) {
    let company = await Company.query()
      .with('designations')
      .where('id', companyId)
      .first()

    const users = await company.users().count()
    const allUser = users[0][Object.keys(users[0])[0]]

    company = company.toJSON()

    const blankDesignation = company.designations.filter(item => {
      return !item.employee_id
    })

    const {
      budget
    } = company

    return {
      budget,
      allUser,
      blankDesignation: blankDesignation.length,
      allDesignation: company.designations.length
    }
  }

  static async getCutOffCompanies(dateTime) {
    const starTime = moment(dateTime)
      .subtract(30, 'minutes')
      .format('HH:mm:ss')
    const endTime = moment(dateTime).format('HH:mm:ss')

    const query = Company.query().whereBetween('cut_off_time', [
      starTime,
      endTime
    ])

    const companies = await query.fetch()

    return companies.toJSON()
  }

  static async getNotifiableBeforeStartOfWorkingCompanies(dateTime) {
    const starTime = moment(dateTime)
      .add('55', 'minutes')
      .format('HH:mm:ss')
    const endTime = moment(dateTime)
      .add('65', 'minutes')
      .format('HH:mm:ss')

    const query = Company.query()
      .whereBetween('start_working_time', [starTime, endTime])
      .with('users', builder => {
        builder.has('employee.designations', '>', 0)
      })

    const companies = await query.fetch()

    return companies.toJSON()
  }

  static async getNotifiableBeforeEndOfWorkingCompanies(dateTime) {
    const starTime = moment(dateTime)
      .add('55', 'minutes')
      .format('HH:mm:ss')
    const endTime = moment(dateTime)
      .add('65', 'minutes')
      .format('HH:mm:ss')

    const query = Company.query()
      .whereBetween('cut_off_time', [starTime, endTime])
      .with('users', builder => {
        builder.has('employee.designations', '>', 0)
      })

    const companies = await query.fetch()

    return companies.toJSON()
  }
}

module.exports = CompanyService
