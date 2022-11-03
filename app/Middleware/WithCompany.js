'use strict'
const UserService = use('App/Services/UserService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class WithCompany {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    const user = auth.user
    let companyId = request.header('x-company')
    let companyIdNum = parseInt(companyId)

    if (!companyId) {
      response.status(422).send('x-company is require.')
      return
    }

    const loadUser = await UserService.getUserCompanyById(user.id, companyIdNum)
    const isHasCompany = !!loadUser.toJSON().companies.length

    if (!isHasCompany) {
      response.status(403).send('Access forbidden. You are not allowed to this resource.')
      return
    }

    request.qs = Object.assign(request.qs, {
      company_id: parseInt(companyId)
    })
    // call next to advance the request
    await next()
  }
}

module.exports = WithCompany
