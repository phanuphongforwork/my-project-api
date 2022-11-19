'use strict'
// const UserService = use('App/Services/UserService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class userIsAvailable {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    const user = auth.user

    if (user.role === '0') {
      response.status(401).send('ไม่สามารถเข้าใช้งานได้, เนื่องจากบัญชีผู้ใช้ถูกปิด.')
      return
    }

    await next()
  }
}

module.exports = userIsAvailable
