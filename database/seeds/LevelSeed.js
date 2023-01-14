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
const Level = use('App/Models/Level')
const Database = use('Database')

class LevelSeed {
  async run() {
    await Database.truncate('levels')

    await Level.createMany([
      {
        level_name: 'แอดมิน'
      },
      {
        level_name: 'อามาสมัคร'
      },
      {
        level_name: 'สมาชิกครัวเรือน'
      }
    ])
  }
}

module.exports = LevelSeed
