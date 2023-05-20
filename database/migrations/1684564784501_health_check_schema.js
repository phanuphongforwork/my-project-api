'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HealthCheckSchema extends Schema {
  up() {
    this.create('health_checks', table => {
      table.increments('health_check_id', 4)
      table.string('health_check_name').notNullable()
      table.string('agency_name').nullable()
      table.string('location_name').nullable()
      table.datetime('health_check_date').nullable()
      table.datetime('health_check_end').nullable()
      table
        .string('status')
        .notNullable()
        .defaultTo('1')

      table.timestamps()
    })
  }

  down() {
    this.drop('health_checks')
  }
}

module.exports = HealthCheckSchema
