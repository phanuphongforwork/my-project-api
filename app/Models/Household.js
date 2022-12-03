'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Household extends Model {
  static get table() {
    return 'households'
  }

  static get primaryKey() {
    return 'house_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  community() {
    return this.hasOne('App/Models/Community', 'comm_id', 'comm_id')
  }

  alley() {
    return this.hasOne('App/Models/Alley', 'alley_id', 'alley_id')
  }

  road() {
    return this.hasOne('App/Models/Road', 'road_id', 'road_id')
  }

  subdistrict() {
    return this.hasOne('App/Models/SubDistrict', 'subdistrict_id', 'subdistrict_id')
  }

  person() {
    return this.hasOne('App/Models/Person', 'person_id', 'person_id')
  }

  volunteer() {
    return this.hasOne('App/Models/Person', 'volunteer_id', 'person_id')
  }

  district() {
    return this.hasOne('App/Models/District', 'district_id', 'district_id')
  }
}

module.exports = Household
