'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubdistrictSchema extends Schema {
  up() {
    this.create('subdistricts', table => {
      table.increments('subdistrict_id', 6)
      table
        .string('subdistrict_name')
        .notNullable()
        .unique()
      table
        .integer('district_id', 4)
        .notNullable()
        .unsigned()
      table.string('post_code', 5).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('subdistricts')
  }
}

module.exports = SubdistrictSchema
