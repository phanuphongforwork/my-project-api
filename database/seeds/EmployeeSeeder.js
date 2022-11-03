'use strict'

/*
|--------------------------------------------------------------------------
| EmployeeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const UserService = use('App/Services/UserService')
const Employee = use('App/Models/Employee')

class EmployeeSeeder {
  async run() {
    Factory.blueprint('App/Models/Employee', async faker => {
      return {
        name: faker.name(),
        company_id: 1,
        user_id: 1
      }
    })
    const employees = await Factory.model('App/Models/Employee').createMany(10)
    employees.forEach(async employee => {
      const createdUser = await UserService.create({
        username: 'user' + employee.id,
        email: 'user_' + employee.id + '@mail.com',
        password: 'demo',
        active: 1,
        company_id: 1,
        role_id: 3
      })

      const updateEmployee = await Employee.find(employee.id)
      updateEmployee.user_id = createdUser.id
      await updateEmployee.save()
    })
  }
}

module.exports = EmployeeSeeder
