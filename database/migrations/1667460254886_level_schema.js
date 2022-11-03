'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LevelSchema extends Schema {
  up() {
    this.create('levels', table => {
      table.increments('level_id', 1)
      table
        .string('level_name')
        .notNullable()
        .unique()
      table
        .string('status', 1)
        .defaultTo('1')
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('levels')
  }
}

module.exports = LevelSchema
