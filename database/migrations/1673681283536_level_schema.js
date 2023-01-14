'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LevelSchema extends Schema {
  up() {
    this.create('levels', table => {
      table.increments('level_id', 1)
      table.string('level_name')
      table.string('status').defaultTo('1')
      table.timestamps()
    })
  }

  down() {
    this.drop('levels')
  }
}

module.exports = LevelSchema
