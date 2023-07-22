'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DistrictUserSchema extends Schema {
  up() {
    this.table('persons', table => {
      table
        .integer('district_id')
        .unsigned()
        .nullable()
        .after('prefix')
    })
  }

  down() {
    this.table('persons', table => {
      table.dropColumn('district_id')
    })
  }
}

module.exports = DistrictUserSchema
