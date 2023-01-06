const Service = use('App/Services/Service')
const Model = use('App/Models/Activity')

class ActivityService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = Model.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getById(id, params = {}) {
    const query = await Model.parseQuery(params)
      .where('activity_id', id)
      .first()

    return query.toJSON()
  }

  static async create(payload) {
    const query = await Model.create(payload)

    return query.toJSON()
  }

  static async update(id, payload) {
    const query = await Model.findOrFail(id)

    const { userIds, ...rest } = payload

    query.merge(rest)

    await query.save()

    await query.users().sync(userIds)

    const result = await Model.parseQuery({ includes: 'users.person' })
      .where('activity_id', query.activity_id)
      .first()

    return query.toJSON()
  }

  static async delete(id) {
    const model = await Model.findOrFail(id)

    const query = await model.delete()

    return query.toJSON()
  }
}

module.exports = ActivityService
