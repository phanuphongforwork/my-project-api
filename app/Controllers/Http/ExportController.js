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

    const workbook = new ExcelJS.Workbook()

    const personName = auth?.user?.person_name || 'ME'

    workbook.creator = personName
    workbook.lastModifiedBy = personName
    workbook.created = new Date()
    workbook.modified = new Date()
    workbook.lastPrinted = new Date()

    const worksheet = workbook.addWorksheet(
      `รายงานปี ${dayjs()
        .add(543, 'year')
        .format('YYYY')}`
    )

    worksheet.columns = [
      { header: 'รายการ', key: 'title', width: 40 },
      { header: 'หน่วยนับ', key: 'unit', width: 10 },
      { header: dayjs().format('MMM'), key: 'amount', width: 10, outlineLevel: 1 }
    ]

    let allUsersCount = 0
    let age1 = 0
    let age2 = 0
    let age3 = 0
    let age4 = 0

    let special1 = 0
    let special2 = 0

    let pregnant = 0

    let afterPregnant = 0

    let disabled = 0

    let chronicDisease = 0

    let violentBehavior = 0

    houseHolds.forEach(house => {
      const members = house?.members

      members.forEach(member => {
        const person = member?.person

        if (person?.date_of_birth) {
          const age = dayjs().diff(person?.date_of_birth, 'year')
          if (Number(age) < 6) {
            age1 += 1
          }

          if (Number(age) >= 6 && Number(age) < 35) {
            age2 += 1
          }

          if (Number(age) >= 35 && Number(age) < 55) {
            age3 += 1
          }

          if (Number(age) >= 35 && Number(age) <= 59) {
            age3 += 1
          }

          if (Number(age) >= 60) {
            age4 += 1
          }
        }

        if (person?.newborn) {
          if (person?.newborn === '1') {
            special1 += 1
          }
          if (person?.newborn === '2') {
            special2 += 1
          }
          if (person?.newborn === '3') {
            special2 += 1
          }
        }

        if (person?.pregnant === '1' || person?.pregnant === '2') {
          pregnant += 1
        }

        if (person?.postpartum === '1' || person?.postpartum === 1) {
          afterPregnant += 1
        }

        if (person?.disabled === '1' || person?.disabled === 1) {
          disabled += 1
        }

        if (person?.chronic_disease === '1' || person?.chronic_disease === 1) {
          chronicDisease += 1
        }

        if (person?.violent_behavior === '1' || person?.violent_behavior === 1) {
          violentBehavior += 1
        }

        if (member?.status === '1') {
          allUsersCount += 1
        }
      })
    })

    worksheet.addRow({
      title: '๑.จำนวนครัวเรือนที่ดูแล',
      unit: 'ครัวเรือน',
      amount: houseHolds?.length || 0
    })

    worksheet.addRow({
      title: '๒.จำนวนประชาชน',
      unit: 'คน',
      amount: allUsersCount || 0
    })

    // worksheet.addRow({
    //   title: '    ชาย',
    //   unit: 'คน',
    //   amount: 5
    // })
    // worksheet.addRow({
    //   title: '    หญิง',
    //   unit: 'คน',
    //   amount: 15
    // })

    worksheet.addRow({
      title: '๓.แบ่งตามช่วงอายุ',
      unit: '',
      amount: ''
    })

    worksheet.addRow({
      title: '    ต่ำกว่า ๖ ปี',
      unit: 'คน',
      amount: age1 || '-'
    })

    worksheet.addRow({
      title: '    ๖ - ๓๕ ปี',
      unit: 'คน',
      amount: age2 || '-'
    })

    worksheet.addRow({
      title: '    ๓๕ - ๕๙ ปี',
      unit: 'คน',
      amount: age3 || '-'
    })

    worksheet.addRow({
      title: '    ๖๐ ปี ขึ้นไป',
      unit: 'คน',
      amount: age4 || '-'
    })

    worksheet.addRow({
      title: '๔. บุุคลที่เป็นกลุ่มเสี่ยง ที่ต้องดูแลพิเศษ',
      unit: 'คน',
      amount: ''
    })

    worksheet.addRow({
      title: '    แรกเกิด อายุต่ำกว่า ๖ เดือน',
      unit: 'คน',
      amount: special1 || '-'
    })

    worksheet.addRow({
      title: '    เด็ก อายุ ๖ เดือน - ๖ ปี',
      unit: 'คน',
      amount: special2 || '-'
    })

    worksheet.addRow({
      title: '    หญิงตั้งครรภ์',
      unit: 'คน',
      amount: pregnant || '-'
    })

    worksheet.addRow({
      title: '    หญิงหลังคลอด',
      unit: 'คน',
      amount: afterPregnant || '-'
    })

    worksheet.addRow({
      title: '    ผู้สูงอายุ',
      unit: 'คน',
      amount: age4 || '-'
    })

    worksheet.addRow({
      title: '    ผู้พิการ',
      unit: 'คน',
      amount: disabled || '-'
    })

    worksheet.addRow({
      title: '    ผู้ป่วยเรื้อรัง',
      unit: 'คน',
      amount: chronicDisease || '-'
    })

    worksheet.addRow({
      title: '    มีพฤติกรรมเสี่ยงด้านความรุนแรง',
      unit: 'คน',
      amount: violentBehavior || '-'
    })

    worksheet.addRow({
      title: '    อื่นๆ ระบุ',
      unit: '',
      amount: ''
    })

    worksheet.columns.forEach(column => {
      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    })

    worksheet.eachRow((Row, rowNum) => {
      Row.eachCell(Cell => {
        if (rowNum == 1) {
          Cell.alignment = {
            vertical: 'center',
            horizontal: 'center'
          }
        } else {
          Cell.alignment = {
            vertical: 'middle',
            horizontal: 'middle'
          }
        }
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}

module.exports = ExportController
