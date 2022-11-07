'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Service = use('App/Services/LevelService')

class LevelSeeder {
  async run() {
    await Service.create({
      level_name: 'admin',
      status: '1'
    })
  }
}

module.exports = LevelSeeder
