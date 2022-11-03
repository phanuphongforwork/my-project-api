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
const RoleService = use('App/Services/RoleService')

class RoleSeeder {
  async run() {
    // return

    await RoleService.create({
      name: 'ผู้ดูแลระบบสูงสุด',
      slug: 'super_admin'
    })
    await RoleService.create({
      name: 'ผู้ดูแลระบบ',
      slug: 'admin'
    })
    await RoleService.create({
      name: 'ผู้จัดการ',
      slug: 'manager'
    })
    await RoleService.create({
      name: 'พนักงาน',
      slug: 'employee'
    })
  }
}

module.exports = RoleSeeder
