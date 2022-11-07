'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Volunteer extends Model {
  static get table() {
    return 'volunteers'
  }

  static get primaryKey() {
    return 'volunteer_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }
}

module.exports = Volunteer
