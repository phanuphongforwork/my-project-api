'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HouseholdMemberSchema extends Schema {
  up() {
    this.create('household_members', table => {
      table
        .integer('house_id', 10)
        .notNullable()
        .unsigned()

      table
        .integer('person_id', 4)
        .notNullable()
        .unsigned()

      table
        .string('member_status', 1)
        .notNullable()
        .defaultTo('2')

      table
        .string('status', 1)
        .notNullable()
        .defaultTo('1')

      table.timestamps()
    })
  }

  down() {
    this.drop('household_members')
  }
}

module.exports = HouseholdMemberSchema
