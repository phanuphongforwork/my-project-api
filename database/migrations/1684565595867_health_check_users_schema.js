'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HealthCheckUsersSchema extends Schema {
  up() {
    this.create('health_check_users', table => {
      table.increments('health_check_user_id')
      table
        .integer('health_check_id', 4)
        .notNullable()
        .unsigned()

      table
        .integer('person_id', 4)
        .notNullable()
        .unsigned()

      table.string('join_date').nullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('health_check_users')
  }
}

module.exports = HealthCheckUsersSchema
