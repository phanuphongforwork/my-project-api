'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivityUserSchema extends Schema {
  up() {
    this.create('activity_users', table => {
      table
        .integer('activity_id', 4)
        .notNullable()
        .unsigned()

      table
        .integer('person_id', 4)
        .notNullable()
        .unsigned()

      table
        .string('status', 1)
        .notNullable()
        .defaultTo('1')

      table.timestamps()
    })
  }

  down() {
    this.drop('activity_users')
  }
}

module.exports = ActivityUserSchema
