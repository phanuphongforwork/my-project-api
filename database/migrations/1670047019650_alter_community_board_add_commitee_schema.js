'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterCommunityBoardAddCommiteeSchema extends Schema {
  up() {
    this.table('community_boards', table => {
      table
        .integer('committee_id', 10)
        .unsigned()
        .notNullable()
      // .after('committee_name')
    })
  }

  down() {
    this.table('community_boards', table => {
      // reverse alternations
    })
  }
}

module.exports = AlterCommunityBoardAddCommiteeSchema
