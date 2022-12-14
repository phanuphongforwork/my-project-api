'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up() {
    this.create('persons', table => {
      table.increments('person_id', 4)
      table.string('person_name', 100).notNullable()
      table
        .string('id_card', 13)
        .notNullable()
        .unique()

      table.string('prefix').nullable()

      table.string('username').nullable()

      table.string('password').nullable()

      table.date('date_of_birth').notNullable()
      table.string('phone', 20)
      table.string('newborn', 1)

      table.string('pregnant', 1)

      table.boolean('postpartum').defaultTo(false)

      table.boolean('disabled').defaultTo(false)

      table.boolean('chronic_disease').defaultTo(false)

      table.boolean('violent_behavior').defaultTo(false)

      table.string('role', 1).defaultTo('3')

      table.timestamps()
    })
  }

  down() {
    this.drop('persons')
  }
}

module.exports = PersonSchema
