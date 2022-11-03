'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommitteeSchema extends Schema {
  up() {
    this.create('committees', table => {
      table.increments('committee_id', 2)
      table
        .string('committee_name', 100)
        .notNullable()
        .unique()

      table.timestamps()
    })
  }

  down() {
    this.drop('committees')
  }
}

module.exports = CommitteeSchema
