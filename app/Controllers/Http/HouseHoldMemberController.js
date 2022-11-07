'use strict'

const Controller = use('App/Controllers/Http/Controller')
const Service = use('App/Services/HouseHoldMemberService')
const Transformer = use('App/Transformers/HouseHoldMember')

class HouseHoldMemberController extends Controller {
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
    const result = await Service.getById(params.house_id, params.person_id, request.get())

    return this.success(response, await Transformer.asyncMake(result))
  }

  async update({ params, request, response }) {
    const payload = request.post()

    try {
      const result = await Service.update(params.house_id, params.person_id, payload)

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
      await Service.delete(params.house_id, params.person_id)
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
}

module.exports = HouseHoldMemberController
