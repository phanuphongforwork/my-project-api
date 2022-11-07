'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Can {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next, ...args) {
    const level = args[0]
    const result = await auth.user.can(level)
    if (!result) {
      response.status(403).json({
        status: 'Unauthorized',
        message: 'Access forbidden. You are not allowed to this resource.'
      })
      return
    }

    // call next to advance the request
    await next()
  }
}

module.exports = Can
