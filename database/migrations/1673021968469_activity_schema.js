'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitySchema extends Schema {
  up() {
    this.create('activities', table => {
      table.increments('activity_id', 4)
      table.string('activity_name').notNullable()
      table.text('activity_description').nullable()
      table.datetime('activity_date').nullable()
      table
        .string('status')
        .notNullable()
        .defaultTo('1')
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
