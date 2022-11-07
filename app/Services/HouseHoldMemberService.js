const Service = use('App/Services/Service')
const Model = use('App/Models/HouseholdMember')

class HouseHoldMemberService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = Model.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getById(houseId, personId, params = {}) {
    const query = await Model.parseQuery(params)
      .where('house_id', houseId)
      .where('person_id', personId)
      .first()

    return query.toJSON()
  }

  static async create(payload) {
    const query = await Model.create(payload)

    return query.toJSON()
  }

  static async update(houseId, personId, payload) {
    const query = await Model.query()
      .where('house_id', houseId)
      .where('person_id', personId)
      .first()

    query.merge(payload)

    await query.save()

    return query.toJSON()
  }

  static async delete(houseId, personId) {
    const model = await Model.query()
      .where('house_id', houseId)
      .where('person_id', personId)
      .first()

    const query = await model.delete()

    return query.toJSON()
  }
}

module.exports = HouseHoldMemberService
