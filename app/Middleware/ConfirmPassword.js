'use strict'

class ConfirmPassword {
  async handle({ request, auth, response }, next) {
    const { password } = request.only(['password'])
    const user = await auth.getUser()

    try {
      await auth.validate(user.username, password, true)
    } catch (e) {
      response
        .status(403)
        .send('Access forbidden. You are not allowed to this resource.')
      return
    }

    await next()
  }
}

module.exports = ConfirmPassword
