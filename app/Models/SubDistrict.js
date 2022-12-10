'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SubDistrict extends Model {
  static get table() {
    return 'subdistricts'
  }

  static get primaryKey() {
    return 'subdistrict_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  district() {
    return this.hasOne('App/Models/District', 'district_id', 'district_id')
  }
}

module.exports = SubDistrict
