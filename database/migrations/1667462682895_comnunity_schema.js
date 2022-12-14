'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComnunitySchema extends Schema {
  up() {
    this.create('communities', table => {
      table.increments('comm_id', 4)
      table
        .string('comm_name')
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
    this.drop('communities')
  }
}

module.exports = ComnunitySchema
