const auth = require('@adonisjs/auth')

const Service = use('App/Services/Service')
const Model = use('App/Models/Level')

class LevelService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = Model.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }
}

module.exports = LevelService
