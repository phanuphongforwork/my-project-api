const Service = use('App/Services/Service')
const Alley = use('App/Models/Alley')

class AlleyService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = Alley.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getById(id, params = {}) {
    const query = await User.parseQuery(params)
      .where('alley_id', id)
      .first()

    return query.toJSON()
  }

  static async create(payload) {
    const query = await Alley.create(payload)

    return query.toJSON()
  }

  static async update(id, payload) {
    const query = await Alley.findOrFail(id)

    query.merge(payload)

    await query.save()

    return query.toJSON()
  }

  static async delete(id) {
    const model = await Alley.findOrFail(id)

    const query = await model.delete()

    return query.toJSON()
  }
}

module.exports = AlleyService
