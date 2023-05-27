const Service = use('App/Services/Service')
const Model = use('App/Models/HealthCheck')
const HealthCheckUser = use('App/Models/HealthCheckUser')
const dayjs = require('dayjs')
require('dayjs/locale/th')
dayjs.locale('th')

class HealCheckService extends Service {
  static async getAll(params) {
    const { page = 1, perPage = 999, includes = 'users' } = params
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
      health_check_name: rest.health_check_name,
      health_check_date: rest.health_check_date,
      agency_name: rest.agency_name,
      location_name: rest.location_name,
      status: rest.status
    }

    query.merge(newPayload)

    await query.save()

    if (newUserIds && newUserIds?.length) {
      const payloadNew = []
      newUserIds.forEach(data => {
        payloadNew.push({
          health_check_id: id,
          person_id: data.person_id,
          join_date: data.join_date,
          remark: data.remark
        })
      })
      await HealthCheckUser.createMany(payloadNew)
    }

    if (deleteUserIds && deleteUserIds?.length) {
      await HealthCheckUser.query()
        .where('health_check_id', id)
        .whereIn('person_id', deleteUserIds)

        .delete()
    }

    const result = await Model.parseQuery({ includes: 'users.person' })
      .where('activity_id', id)
      .first()

    return result.toJSON()
  }

  static async delete(id) {
    const model = await Model.findOrFail(id)

    const query = await model.delete()

    return query.toJSON()
  }
}

module.exports = HealCheckService
