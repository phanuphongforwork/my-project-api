const Service = use('App/Services/Service')
const Model = use('App/Models/Activity')
const ActivityUser = use('App/Models/ActivityUser')

class ActivityService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = 'users' } = params
    const model = Model.parseQuery(params).with('users.person')

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

    const { deleteUserIds = [], newUserIds = [], ...rest } = payload

    const newPayload = {
      activity_name: rest.activity_name,
      activity_date: rest.activity_date,
      activity_description: rest.activity_description,
      status: rest.status
    }

    query.merge(newPayload)

    await query.save()

    if (newUserIds && newUserIds?.length) {
      const payloadNew = []
      newUserIds.forEach(person_id => {
        payloadNew.push({
          activity_id: id,
          person_id: person_id
        })
      })
      await ActivityUser.createMany(payloadNew)
    }

    if (deleteUserIds && deleteUserIds?.length) {
      await ActivityUser.query()
        .where('activity_id', id)
        .whereIn('person_id', deleteUserIds)
        .delete()
    }

    const result = await Model.parseQuery({ includes: 'users.person' })
      .where('activity_id', id)
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
