'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DistrictSchema extends Schema {
  up() {
    this.create('districts', table => {
      table.increments('district_id', 4)
      table
        .string('district_name')
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('districts')
  }
}

module.exports = DistrictSchema
