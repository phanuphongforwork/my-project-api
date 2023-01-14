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
const User = use('App/Models/User')
const Database = use('Database')

class PersonSeeder {
  async run() {
    // await Database.truncate('persons')

    const user = await User.query()
      .where('person_id', 1)
      .first()

    if (!user) {
      await User.create({
        person_id: 1,
        level_id: 1
      })
    }
  }
}

module.exports = PersonSeeder
