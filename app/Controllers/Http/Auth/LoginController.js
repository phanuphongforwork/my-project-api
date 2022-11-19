'use strict'
const Controller = use('App/Controllers/Http/Controller')
const PersonService = use('App/Services/PersonService')

class LoginController extends Controller {
  async index({ request, response, auth }) {
    const { username, password } = request.all()

    let result
    try {
      result = await auth.attempt(username, password)
      const user = await PersonService.getByUsername(username)

      if (user.role === '0') {
        return this.fail(response, null, 'ไม่สามารถเข้าใช้งานได้')
      }

      return this.success(response, result)
    } catch (e) {
      return this.fail(
        response,
        {
          message: e.message
        },
        'ชื่อผู้ใช้หรือรหัสผ่านผิด',
        401
      )
    }
  }
}

module.exports = LoginController
