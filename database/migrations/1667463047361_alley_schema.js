'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlleySchema extends Schema {
  up() {
    this.create('alleys', table => {
      table.increments('alley_id', 4)
      table
        .string('alley_name')
        .notNullable()
        .unique()
      table
        .integer('subdistrict_id', 6)
        .notNullable()
        .unsigned()

      table.timestamps()
    })
  }

  down() {
    this.drop('alleys')
  }
}

module.exports = AlleySchema
