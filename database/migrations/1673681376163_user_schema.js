'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table
        .integer('person_id', 4)
        .unsigned()
        .notNullable()
      table
        .integer('level_id', 1)
        .unsigned()
        .notNullable()
      table.timestamps()
      table.string('status').defaultTo('1')
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
