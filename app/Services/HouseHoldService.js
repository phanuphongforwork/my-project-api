const Service = use('App/Services/Service')
const Model = use('App/Models/Household')
const HouseholdMember = use('App/Models/HouseholdMember')

class HouseHoldService extends Service {
  static async getAll(params, role, userId, withOutPaginate = false) {
    const { page, perPage, includes = 'district,community,alley,road,subdistrict,person,volunteer' } = params

    const model = Model.parseQuery(params).with('members', builder => {
      builder.where('status', '1').with('person')
    })

    if (role !== '1') {
      model.where('volunteer_id', userId)
    }

    if (withOutPaginate) {
      const query = await model.fetch()
      return await query.toJSON()
    }
    const query = await model.paginate(page, perPage)

    return await query.toJSON()
  }

  static async getMyHouse(params, userId) {
    const { page, perPage, includes = 'district,community,alley,road,subdistrict,person,volunteer' } = params

    const house = await HouseholdMember.query()
      .where('person_id', userId)
      .where('status', '1')
      .first()

    const model = Model.parseQuery({ includes: 'district,community,alley,road,subdistrict,person,volunteer' })
      .where('house_id', house.house_id)
      .with('members', builder => {
        builder.with('person')
      })

    const query = await model.paginate(1, 20)

    console.log(await query.toJSON())

    return await query.toJSON()
  }

  static async getUserInHouse(id) {
    const model = HouseholdMember.parseQuery({
      includes: 'person'
    })
      .where('house_id', id)
      .where('status', '1')

    const query = await model.paginate(1, 500)

    return await query.toJSON()
  }

  static async getById(id, params = {}) {
    const query = await Model.parseQuery(params)
      .where('house_id', id)
      .first()

    return query.toJSON()
  }

  static async create(payload) {
    const query = await Model.create(payload)

    const result = await Model.parseQuery({ includes: 'community,alley,road,subdistrict,person,volunteer,district' })
      .where('house_id', query.house_id)
      .first()

    return result.toJSON()
  }

  static async update(id, payload) {
    const query = await Model.findBy('house_id', id)

    query.merge(payload)

    await query.save()

    const result = await Model.parseQuery({ includes: 'community,alley,road,subdistrict,person,volunteer,district' })
      .where('house_id', query.house_id)
      .first()

    return result.toJSON()
  }

  static async delete(id) {
    const model = await Model.findOrFail(id)

    const query = await model.delete()

    return query.toJSON()
  }
}

module.exports = HouseHoldService
