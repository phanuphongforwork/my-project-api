'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoadSchema extends Schema {
  up() {
    this.create('roads', table => {
      table.increments('road_id', 4)
      table
        .string('road_name')
        .notNullable()
        .unique()

      table.timestamps()
    })
  }

  down() {
    this.drop('roads')
  }
}

module.exports = RoadSchema
