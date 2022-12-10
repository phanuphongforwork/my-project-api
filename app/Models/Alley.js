'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alley extends Model {
  static get table() {
    return 'alleys'
  }
  static get primaryKey() {
    return 'alley_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  subdistrict() {
    return this.hasOne('App/Models/SubDistrict', 'subdistrict_id', 'subdistrict_id')
  }
}

module.exports = Alley
