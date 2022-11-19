const Service = use('App/Services/Service')
const Model = use('App/Models/Person')

class PersonService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = Model.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getById(id, params = {}) {
    const query = await Model.parseQuery(params)
      .where('person_id', id)
      .first()

    return query.toJSON()
  }

  static async create(payload) {
    const query = await Model.create(payload)

    return query.toJSON()
  }

  static async update(id, payload) {
    const query = await Model.findOrFail(id)

    query.merge(payload)

    await query.save()

    return query.toJSON()
  }

  static async delete(id) {
    const model = await Model.findOrFail(id)

    const query = await model.delete()

    return query.toJSON()
  }

  static async getByUsername(username) {
    const user = await Model.query()
      .where('username', username)
      .first()

    return user.toJSON()
  }

  static async getUserById(id, params = {}) {
    const query = Model.parseQuery(params).where('person_id', id)

    const user = await query.first()

    return user.toJSON()
  }
}

module.exports = PersonService
