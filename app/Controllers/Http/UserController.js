'use strict'

const Controller = use('App/Controllers/Http/Controller')
const UserService = use('App/Services/UserService')
const UserTransformer = use('App/Transformers/User')

class UserController extends Controller {
  async index({ request, response, auth }) {
    const users = await UserService.getAll(request.get())

    return this.success(response, await UserTransformer.asyncPaginate(users), 'OK', this.makePaginateMeta(users))
  }

  async store({ request, response }) {
    const payload = request.only(['level_id', 'username', 'password', 'status'])

    const user = await UserService.create(payload)

    return this.success(response, await UserTransformer.asyncMake(user))
  }

  async show({ params, response, request }) {
    const user = await UserService.getUserById(params.id, request.get())

    return this.success(response, await UserTransformer.asyncMake(user))
  }

  async update({ params, request, response }) {
    const userId = params.id
    const payload = request.only(['level_id', 'username', 'password', 'status'])

    try {
      const user = await UserService.update(userId, payload)

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

  async me({ auth, response, request }) {
    console.log(auth.user)
    if (auth.user.status !== '1') {
      return this.fail(response, null, 'ไม่สามารถเข้าใช้งานได้')
    }

    const params = {
      includes: 'level,person'
    }

    const user = await UserService.getUserById(auth.user.person_id, params)

    return this.success(response, await UserTransformer.asyncMake(user))
  }
}

module.exports = UserController
