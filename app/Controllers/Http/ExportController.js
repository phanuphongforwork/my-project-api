'use strict'

const Controller = use('App/Controllers/Http/Controller')
const HouseHoldService = use('App/Services/HouseHoldService')
const ExcelJS = require('exceljs')
const dayjs = require('dayjs')
require('dayjs/locale/th')
dayjs.locale('th')

class ExportController extends Controller {
  async houseHolds({ request, response, auth }) {
    const houseHolds = await HouseHoldService.getAll(request.get(), auth.user.role, auth.user.person_id, true)

    let allUsersCount = 0
    let age1 = 0
    let age2 = 0
    let age3 = 0
    let age4 = 0
    let age5 = 0
    let age6 = 0
    let age7 = 0

    let disabled = 0

    let chronicDisease = 0

    houseHolds.forEach(house => {
      const members = house?.members

      members.forEach(member => {
        const person = member?.person

        if (person?.date_of_birth) {
          const age = dayjs().diff(person?.date_of_birth, 'year')
          if (Number(age) <= 6) {
            age1 += 1
          }

          if (Number(age) > 6 && Number(age) <= 15) {
            age2 += 1
          }

          if (Number(age) > 15 && Number(age) <= 59) {
            age3 += 1
          }

          if (Number(age) >= 60) {
            age4 += 1
          }

          if (Number(age) > 60 && Number(age) <= 69) {
            age5 += 1
          }

          if (Number(age) > 69 && Number(age) <= 79) {
            age6 += 1
          }

          if (Number(age) > 80) {
            age7 += 1
          }
        }

        if (person?.disabled === '1' || person?.disabled === 1) {
          disabled += 1
        }

        if (person?.chronic_disease === '1' || person?.chronic_disease === 1) {
          chronicDisease += 1
        }

        if (member?.status === '1') {
          allUsersCount += 1
        }
      })
    })

    return {
      age1,
      age2,
      age3,
      age4,
      age5,
      age6,
      age7,
      allUsersCount,
      disabled,
      chronicDisease,
      houseHolds: houseHolds?.length || 0
    }
  }
}

module.exports = ExportController
