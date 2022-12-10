'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CommunityBoard extends Model {
  static get table() {
    return 'community_boards'
  }

  static get primaryKey() {
    return 'community_board_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }
  person() {
    return this.hasOne('App/Models/Person', 'person_id', 'person_id')
  }

  committee() {
    return this.hasOne('App/Models/Committee', 'committee_id', 'committee_id')
  }
}

module.exports = CommunityBoard
