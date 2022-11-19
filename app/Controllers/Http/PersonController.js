'use strict'

const Controller = use('App/Controllers/Http/Controller')
const Service = use('App/Services/PersonService')
const Transformer = use('App/Transformers/Person')

class PersonController extends Controller {
  async index({ request, response, auth }) {
    const result = await Service.getAll(request.get())

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async store({ request, response }) {
    const payload = request.post()
    const result = await Service.create(payload)

    return this.success(response, await Transformer.asyncMake(result))
  }

  async show({ params, response, request }) {
    const result = await Service.getById(params.id, request.get())

    return this.success(response, await Transformer.asyncMake(result))
  }

  async update({ params, request, response }) {
    const id = params.id
    const payload = request.post()

    try {
      const result = await Service.update(id, payload)

      return this.success(response, await Transformer.asyncMake(result), 'Update success')
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Update error'
      )
    }
  }

  async destroy({ params, response }) {
    try {
      await Service.delete(params.id)
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Delete user error'
      )
    }

    return this.success(response, null, 'Delete success')
  }

  async me({ auth, response, request }) {
    if (auth.user.role === '0') {
      return this.fail(response, null, 'ไม่สามารถเข้าใช้งานได้')
    }

    const params = {
      includes: ''
    }

    const user = await Service.getUserById(auth.user.person_id, params)

    return this.success(response, await Transformer.asyncMake(user))
  }
}

module.exports = PersonController
