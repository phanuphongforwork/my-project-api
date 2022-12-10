'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Community extends Model {
  static get table() {
    return 'communities'
  }

  static get primaryKey() {
    return 'comm_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  subdistrict() {
    return this.hasOne('App/Models/SubDistrict', 'subdistrict_id', 'subdistrict_id')
  }
}

module.exports = Community
