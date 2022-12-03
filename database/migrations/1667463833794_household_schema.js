'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HouseholdSchema extends Schema {
  up() {
    this.create('households', table => {
      table.increments('house_id', 10)
      table.string('house_number')
      table
        .integer('comm_id', 4)
        .notNullable()
        .unsigned()
      table
        .integer('alley_id', 4)
        .notNullable()
        .unsigned()
      table
        .integer('road_id', 4)
        .notNullable()
        .unsigned()

      table
        .integer('district_id', 4)
        .notNullable()
        .unsigned()

      table
        .integer('subdistrict_id', 6)
        .notNullable()
        .unsigned()

      table
        .integer('person_id', 4)
        .notNullable()
        .unsigned()

      table
        .integer('volunteer_id', 4)
        .nullable()()
        .unsigned()

      table.string('phone', 20).notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('households')
  }
}

module.exports = HouseholdSchema
