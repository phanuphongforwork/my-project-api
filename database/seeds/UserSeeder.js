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
const Person = use('App/Models/Person')
const Database = use('Database')

class UserSeeder {
  async run() {
    await Database.truncate('persons')
    await Person.create({
      person_id: 1,
      person_name: 'ผู่้ดูแลระบบ',
      id_card: '1111111111111',
      username: 'admin',
      password: '123456',
      date_of_birth: '2565-11-01',
      phone: '0999999999',
      role: '1'
    })
  }
}

module.exports = UserSeeder
