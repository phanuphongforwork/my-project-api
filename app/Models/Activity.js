'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Activity extends Model {
  static get table() {
    return 'activities'
  }
  static get primaryKey() {
    return 'activity_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  users() {
    return this.hasMany('App/Models/ActivityUser', 'activity_id', 'activity_id')
  }
}

module.exports = Activity
