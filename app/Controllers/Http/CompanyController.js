'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Controller = use('App/Controllers/Http/Controller')
const CompanyService = use('App/Services/CompanyService')
const CompanyTransformer = use('App/Transformers/Company')
const DesignationService = use('App/Services/DesignationService')
/**
 * Resourceful controller for interacting with companies
 */
class CompanyController extends Controller {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const companies = await CompanyService.getAll(request.get())

    return this.success(response, CompanyTransformer.paginate(companies), 'OK', this.makePaginateMeta(companies))
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const payload = request.only([
      'name',
      'description',
      'budget',
      'start_working_time',
      'cut_off_time',
      'over_night',
      'lat',
      'lng',
      'attendance_radius',
      'attendance_check_position'
    ])

    try {
      const company = await CompanyService.create(payload)

      return this.success(response, CompanyTransformer.make(company), 'Create Company success')
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Create Company error'
      )
    }
  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    try {
      const company = await CompanyService.getById(params.id, request.get())

      return this.success(response, CompanyTransformer.make(company))
    } catch (ex) {
      return this.fail(response, {
        message: ex.message
      })
    }
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const companyId = params.id
    const payload = request.only([
      'name',
      'description',
      'budget',
      'start_working_time',
      'cut_off_time',
      'over_night',
      'lat',
      'lng',
      'attendance_radius',
      'attendance_check_position'
    ])
    try {
      const company = await CompanyService.update(companyId, payload)

      return this.success(response, CompanyTransformer.make(company), 'Update Company success')
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Update Company error'
      )
    }
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      await CompanyService.delete(params.id)
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Delete company error'
      )
    }

    return this.success(response, null, 'Delete company success')
  }

  /**
   * Get a company salary usage summary
   * DELETE companies/:id/salary-usage-summary
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async salaryUsageSummary({ params, response }) {
    const { id: companyId } = params

    const data = {
      used: 0,
      available: 0
    }

    try {
      const used = await DesignationService.getUsedSalary(companyId)
      data.used = used
      data.available = 100 - used
    } catch (e) {
      return this.fail(response, e, e.message)
    }

    return this.success(response, data)
  }

  async amountReportSummary({ params, response }) {
    const { id: companyId } = params

    let data
    try {
      data = await CompanyService.getAmountReportSummary(companyId)
    } catch (e) {
      return this.fail(response, e, e.message)
    }

    return this.success(response, data)
  }
}

module.exports = CompanyController
