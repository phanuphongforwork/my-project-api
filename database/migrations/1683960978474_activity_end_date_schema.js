'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivityEndDateSchema extends Schema {
  up() {
    this.table('activities', table => {
      table
        .datetime('activity_end_date')
        .nullable()
        .after('activity_date')
    })
  }

  down() {
    this.table('activities', table => {
      table.dropColumn('activity_end_date')
    })
  }
}

module.exports = ActivityEndDateSchema
