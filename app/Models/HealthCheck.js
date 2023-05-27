'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HealthCheck extends Model {
  static get table() {
    return 'health_checks'
  }
  static get primaryKey() {
    return 'health_check_id'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  users() {
    return this.hasMany('App/Models/HealthCheckUser', 'health_check_id', 'health_check_id')
  }
}

module.exports = HealthCheck
