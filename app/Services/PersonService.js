const auth = require('@adonisjs/auth')

const Service = use('App/Services/Service')
const Model = use('App/Models/Person')
const HouseholdMember = use('App/Models/HouseholdMember')
const User = use('App/Models/User')

class PersonService extends Service {
  static async getAll(params, user) {
    const { page, perPage, includes = '' } = params
    const model = Model.parseQuery(params)

    if (user.role !== '1') {
      const members = await HouseholdMember.query()
        // .select('person_id')
        .whereHas('household', builder => {
          builder.where('volunteer_id', user.person_id)
        })
        .fetch()

      const memberIds = await members.toJSON().map(member => {
        return member.person_id
      })

      console.log(memberIds)

      model.whereIn('person_id', memberIds)
    }

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getAvailable(params) {
    const { page, perPage, includes = '' } = params

    const members = await HouseholdMember.query()
      .select('person_id')
      .whereIn('status', ['1', '0'])
      .fetch()

    const memberJson = members.toJSON()

    const membersIds = memberJson.map(item => {
      return item.person_id
    })

    const model = Model.parseQuery(params).whereNotIn('person_id', membersIds)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getNotInActivity(params, userIds = []) {
    const { page, perPage, includes = '' } = params

    const model = Model.parseQuery(params).whereNotIn('person_id', userIds)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }

  static async getHeadHouse(params) {
    const { page, perPage, includes = '', houseId = null } = params

    const members = await HouseholdMember.query()
      .select('person_id')
      .where('member_status', '2')
      .fetch()

    const memberJson = members.toJSON()

    const membersIds = memberJson.map(item => {
      return item.person_id
    })

    const model = Model.parseQuery(params).whereNotIn('person_id', membersIds)

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

  static async getByUsername(username, role) {
    const user = await Model.query()
      .where('username', username)
      .whereHas('levels', builder => {
        builder.where('level_id', role)
      })
      .first()

    return user.toJSON()
  }

  static async getUserById(id, params = {}) {
    const query = Model.parseQuery(params).where('person_id', id)

    const user = await query.first()

    return user.toJSON()
  }

  static async updatePersonLevel(personId, levelIds = []) {
    const levels = await User.query()
      .where('person_id', personId)
      .delete()

    if (levelIds && levelIds.length > 0) {
      let payload = []

      levelIds.forEach(level => {
        payload.push({
          level_id: level,
          person_id: personId
        })
      })
      await User.createMany(payload)
    }

    return 'success'
  }
}

module.exports = PersonService
