'use strict'

const Controller = use('App/Controllers/Http/Controller')
const Service = use('App/Services/HouseHoldService')
const Transformer = use('App/Transformers/HouseHold')
const HouseHoldMember = use('App/Transformers/HouseHoldMember')

class HouseHoldController extends Controller {
  async index({ request, response, auth }) {
    const result = await Service.getAll(request.get(), auth.user.role, auth.user.person_id)

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async getUserInHouse({ request, response, auth, params }) {
    const result = await Service.getUserInHouse(params.id)

    return this.success(response, await HouseHoldMember.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async getMyHouse({ request, response, auth, params }) {
    const result = await Service.getMyHouse(request.get(), auth.user.person_id)

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async store({ request, response, auth }) {
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
}

module.exports = HouseHoldController
