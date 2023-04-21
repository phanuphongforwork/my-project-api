'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddJoinDateSchema extends Schema {
  up() {
    this.table('activity_users', table => {
      table
        .string('join_date')
        .nullable()
        .after('status')
    })
  }

  down() {
    this.table('activity_users', table => {
      table.dropColumn('join_date')
    })
  }
}

module.exports = AddJoinDateSchema
