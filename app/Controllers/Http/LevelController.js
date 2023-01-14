'use strict'

const Controller = use('App/Controllers/Http/Controller')
const Service = use('App/Services/LevelService')
const Transformer = use('App/Transformers/Level')

class LevelController extends Controller {
  async index({ request, response, auth }) {
    const result = await Service.getAll(request.get())

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }
}

module.exports = LevelController
