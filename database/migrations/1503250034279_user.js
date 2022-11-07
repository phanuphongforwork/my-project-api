'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table
        .integer('person_id', 1)
        .nullable()
        .unique()
        .unsigned()

      table
        .integer('level_id', 1)
        .notNullable()
        .unique()
        .unsigned()
      table
        .string('username', 100)
        .notNullable()
        .unique()
      table.string('password', 100).notNullable()
      table
        .string('status', 1)
        .defaultTo('1')
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
