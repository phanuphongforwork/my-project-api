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

  static async createOrUpdate(payload) {
    const exist = await Model.query()
      .where('house_id', payload.house_id)
      .where('person_id', payload.person_id)
      .first()

    if (exist) {
      return await this.update(payload)
    } else {
      return await this.create(payload)
    }
  }

  static async create(payload) {
    const query = await Model.create(payload)

    const result = await Model.parseQuery({ includes: 'person' })
      .where('house_id', query.house_id)
      .where('person_id', query.person_id)
      .first()

    return result.toJSON()
  }

  static async update(payload) {
    const query = await Model.parseQuery({ includes: 'person' })
      .where('house_id', payload.house_id)
      .where('person_id', payload.person_id)
      .first()

    if (payload.member_status === '1' && query.member_status !== '1') {
      await this.updateHead(payload.house_id)
    }
    query.merge({
      member_status: payload.member_status,
      status: payload.status
    })

    await query.save()

    return query.toJSON()
  }

  async updateHead(house_id) {
    const head = await Model.query()
      .where('house_id', house_id)
      .where('member_status', '1')
      .first()

    if (head) {
      head.merge({
        member_status: '2'
      })

      await head.save()
    }
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
