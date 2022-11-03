'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ActiveRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    // call next to advance the request
    const { 'x-role': roleId } = request.headers()

    if (!roleId) {
      response.status(401).send('Unauthorized')
      return
    }

    await auth.user.load('roles')
    const role = (auth.user.toJSON().roles || []).find(item => {
      return item.id === parseInt(roleId)
    })

    if (!role) {
      response.status(401).send('Unauthorized')
      return
    }

    request.qs = Object.assign(request.qs, {
      active_role_id: parseInt(roleId)
    })

    await next()
  }
}

module.exports = ActiveRole
