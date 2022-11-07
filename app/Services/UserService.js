const Service = use('App/Services/Service')
const User = use('App/Models/User')

class UserService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = User.parseQuery(params)

    const users = await model.paginate(page, perPage)

    return users.toJSON()
  }

  static async getById(id, params = {}) {
    const user = await User.parseQuery(params)
      .where('person_id', id)
      .first()

    return user.toJSON()
  }

  static async getByUsername(username) {
    const user = await User.query()
      .where('username', username)
      .first()

    return user.toJSON()
  }

  static async getUserById(id, params = {}) {
    const query = User.parseQuery(params).where('person_id', id)

    const user = await query.first()

    return user.toJSON()
  }

  static async create(payload) {
    let user
    try {
      user = await User.create(payload)
    } catch (e) {
      throw e
    }

    return user.toJSON()
  }

  static async update(id, payload) {
    const user = await User.findOrFail(id)

    user.merge(payload)
    if (payload.password && payload.password.length) {
      user.password = payload.password
    }
    await user.save()

    return user.toJSON()
  }

  static async delete(id) {
    const user = await User.findOrFail(id)

    const result = await user.delete()

    return result
  }
}

module.exports = UserService
