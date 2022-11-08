'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Service = use('App/Services/PersonService')
const Database = use('Database')

class PersonSeeder {
  async run() {
    await Database.truncate('persons')
    const person = await Service.create({
      person_name: 'admin',
      id_card: '1234567890',
      date_of_birth: '2022-11-08'
    })
  }
}

module.exports = PersonSeeder
