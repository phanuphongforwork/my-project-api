'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Env = use('Env')

class ApiKey {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, request }, next) {
    // call next to advance the request
    if (request.header('x-api-key') !== Env.get('API_KEY')) {
      response.status(401).send('Unauthorized')
      return
    }
    await next()
  }
}

module.exports = ApiKey
