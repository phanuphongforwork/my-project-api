'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HealthCheckUser extends Model {
  static get table() {
    return 'health_check_users'
  }

  static boot() {
    super.boot()

    this.addTrait('ParseQuery', { searchableFields: [] })
  }

  person() {
    return this.hasOne('App/Models/Person', 'person_id', 'person_id')
  }

  activity() {
    return this.hasOne('App/Models/HealthCheck', 'health_check_id', 'health_check_id')
  }
}

module.exports = HealthCheckUser
