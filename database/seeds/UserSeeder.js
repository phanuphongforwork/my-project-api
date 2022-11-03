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
const Role = use('App/Models/Role')

class UserSeeder {
  async run() {
    const user = await User.create({
      username: 'superadmin',
      email: 'superadmin@mail.com',
      password: '123456',
      active: 1
    })

    const roles = await Role.query()
      .whereIn('slug', ['super_admin', 'manager'])
      .fetch()

    let roldIds = []
    if (roles && roles.rows) {
      roldIds = roles.rows.map(item => {
        return item.id
      })
    }

    await user.roles().sync(roldIds)
  }
}

module.exports = UserSeeder
