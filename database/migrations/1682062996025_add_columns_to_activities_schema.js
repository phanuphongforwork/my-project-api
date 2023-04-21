'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsToActivitiesSchema extends Schema {
  up() {
    this.table('activities', table => {
      table
        .string('agency_name')
        .nullable()
        .after('activity_date')
      table
        .string('location_name')
        .nullable()
        .after('agency_name')
    })
  }

  down() {
    this.table('activities', table => {
      table.dropColumn('agency_name')
      table.dropColumn('location_name')
    })
  }
}

module.exports = AddColumnsToActivitiesSchema
