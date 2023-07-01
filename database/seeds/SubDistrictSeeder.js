'use strict'

const subdistrictJson = require('../../constants/subdistricts.json')
const pcodeJson = require('../../constants/pcode.json')

/*
|--------------------------------------------------------------------------
| SubDistrictSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const SubDistrict = use('App/Models/SubDistrict')
const Database = use('Database')

class SubDistrictSeeder {
  async run() {
    const subdistricts = []

    subdistrictJson.forEach(item => {
      const post = pcodeJson.find(sub => {
        return Number(sub?.subdistrict) === Number(item?.scode)
      })

      subdistricts.push({
        subdistrict_id: item?.scode,
        subdistrict_name: item?.sname,
        district_id: item?.dcode,
        post_code: post?.code || ''
      })
    })

    await Database.truncate('subdistricts')
    await SubDistrict.createMany(subdistricts)
  }
}

module.exports = SubDistrictSeeder
