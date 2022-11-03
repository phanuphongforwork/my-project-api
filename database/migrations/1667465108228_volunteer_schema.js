'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VolunteerSchema extends Schema {
  up() {
    this.create('volunteers', table => {
      table
        .integer('volunteer_id', 4)
        .notNullable()
        .unsigned()

      table
        .integer('person_id', 4)
        .notNullable()
        .unsigned()

      table
        .string('status', 1)
        .notNullable()
        .defaultTo('1')

      table.timestamps()
    })
  }

  down() {
    this.drop('volunteers')
  }
}

module.exports = VolunteerSchema
