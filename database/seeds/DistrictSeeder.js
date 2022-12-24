'use strict'

const districtJson = require('../../constants/districts.json')

/*
|--------------------------------------------------------------------------
| DistrictSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const District = use('App/Models/District')
const Database = use('Database')

class DistrictSeeder {
  async run() {
    const districts = []

    if (districtJson?.features?.length > 0) {
      districtJson.features.forEach(item => {
        if (item?.properties?.dname) {
          districts.push({
            district_id: item?.properties?.dcode,
            district_name: item?.properties?.dname
          })
        }
      })
    }

    await Database.truncate('districts')
    await District.createMany(districts)
  }
}

module.exports = DistrictSeeder
