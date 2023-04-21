'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIdToActiviteUsersSchema extends Schema {
  up() {
    this.table('activity_users', table => {
      table.increments('id', 4).after('activity_id')
    })
  }

  down() {
    this.table('activity_users', table => {
      table.dropColumn('id')
    })
  }
}

module.exports = AddIdToActiviteUsersSchema
