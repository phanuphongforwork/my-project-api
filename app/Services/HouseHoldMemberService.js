const Service = use('App/Services/Service')
const Model = use('App/Models/HouseholdMember')
const Household = use('App/Models/Household')

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

  static async createOrUpdate(payload) {
    const exist = await Model.query()
      .where('house_id', payload.house_id)
      .where('person_id', payload.person_id)
      .first()

    const newPayload = {
      house_id: payload.house_id,
      person_id: payload.person_id,
      status: payload.status,
      member_status: payload.member_status
    }

    if (exist) {
      return await this.update(newPayload)
    } else {
      return await this.create(newPayload)
    }
  }

  static async create(payload) {
    if (payload.member_status === '1') {
      const head = await Model.query()
        .where('house_id', payload.house_id)
        .where('member_status', '1')
        .update({ member_status: '2' })

      await Household.query()
        .where('house_id', payload.house_id)
        .update({ person_id: payload.person_id })
    }

    const query = await Model.create(payload)

    const result = await Model.parseQuery({ includes: 'person' })
      .where('house_id', query.house_id)
      .where('person_id', query.person_id)
      .first()

    return result.toJSON()
  }

  static async update(payload) {
    if (payload.member_status === '1') {
      const head = await Model.query()
        .where('house_id', payload.house_id)
        .where('member_status', '1')
        .update({ member_status: '2' })

      await Household.query()
        .where('house_id', payload.house_id)
        .update({ person_id: payload.person_id })
    }

    const query = await Model.query()
      .where('house_id', payload.house_id)
      .where('person_id', payload.person_id)
      .update({
        member_status: payload.member_status,
        status: payload.status
      })

    const person = await Model.query()
      .where('house_id', payload.house_id)
      .where('person_id', payload.person_id)
      .first()

    return await person.toJSON()
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
