const Service = use('App/Services/Service')
const Model = use('App/Models/CommunityBoard')
const dayjs = require('dayjs')
require('dayjs/locale/th')
dayjs.locale('th')
class CommunityBoardService extends Service {
  static async getAll(params) {
    const { page, perPage, includes = '' } = params
    const model = Model.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return query.toJSON()
  }
  static async getAvailable(params) {
    const { idCard = '', committeeId = '' } = params
    const model = Model.parseQuery({
      perPage: 1000,
      includes: 'person,committee'
    })
      .where('status', '1')
      .where(
        'start_date',
        '>=',
        dayjs()
          .startOf('year')
          .format('YYYY-MM-DD')
      )

    if (idCard && committeeId) {
      model.where('committee_id', committeeId).whereHas('person', person => {
        person.where('id_card', idCard)
      })
    }

    const query = await model.paginate(1, 1000)

    return query.toJSON()
  }

  static async getById(id, params = {}) {
    const query = await Model.parseQuery(params)
      .where('community_board_id', id)
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
}

module.exports = CommunityBoardService
