'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ActivityUser extends Model {
  static get table() {
    return 'activity_users'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  person() {
    return this.hasOne('App/Models/Person', 'person_id', 'person_id')
  }
}

module.exports = ActivityUser
