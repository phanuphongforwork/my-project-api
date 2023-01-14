'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static get table() {
    return 'users'
  }

  static get primaryKey() {
    return 'person_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', {
      searchableFields: []
    })
  }

  person() {
    return this.hasOne('App/Models/Person', 'person_id', 'person_id')
  }

  level() {
    return this.hasOne('App/Models/Level', 'level_id', 'level_id')
  }
}

module.exports = User
