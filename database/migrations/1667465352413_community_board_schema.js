'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommunityBoardSchema extends Schema {
  up() {
    this.create('community_boards', table => {
      table.increments('community_board_id', 2)

      table
        .integer('person_id', 4)
        .notNullable()
        .unsigned()

      table.datetime('start_date').notNullable()

      table.datetime('end_date').notNullable()

      table
        .string('status', 1)
        .notNullable()
        .defaultTo('1')
      table.timestamps()
    })
  }

  down() {
    this.drop('community_boards')
  }
}

module.exports = CommunityBoardSchema
