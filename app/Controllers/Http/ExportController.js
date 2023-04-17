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

    worksheet.addRow({
      title: '๑.จำนวนครัวเรือนที่ดูแล',
      unit: 'ครัวเรือน',
      amount: 10
    })

    worksheet.addRow({
      title: '๒.จำนวนประชาชน',
      unit: 'คน',
      amount: 20
    })

    worksheet.addRow({
      title: '    ชาย',
      unit: 'คน',
      amount: 5
    })
    worksheet.addRow({
      title: '    หญิง',
      unit: 'คน',
      amount: 15
    })

    worksheet.addRow({
      title: '๓.แบ่งตามช่วงอายุ',
      unit: '',
      amount: ''
    })

    worksheet.addRow({
      title: '    ต่ำกว่า ๖ ปี',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    ต่ำกว่า ๖ ปี',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    ๖ - ๓๕ ปี',
      unit: 'คน',
      amount: 4
    })

    worksheet.addRow({
      title: '    ๓๕ - ๕๕ ปี',
      unit: 'คน',
      amount: 4
    })

    worksheet.addRow({
      title: '    ๖๐ ปี ขึ้นไป',
      unit: 'คน',
      amount: 16
    })

    worksheet.addRow({
      title: '๔. บุุคลที่เป็นกลุ่มเสี่ยง ที่ต้องดูแลพิเศษ',
      unit: 'คน',
      amount: ''
    })

    worksheet.addRow({
      title: '    แรกเกิด อายุต่ำกว่า ๖ เดือน',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    เด็ก อายุ ๖ เดือน - ๖ ปี',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    หญิงตั้งครรภ์',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    หญิงหลังคลอด',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    ผู้สูงอายุ',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    ผู้พิการ',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    ผู้ป่วยเรื้อรัง',
      unit: 'คน',
      amount: '-'
    })

    worksheet.addRow({
      title: '    มีพฤติกรรมเสี่ยงด้านความรุนแรง',
      unit: 'คน',
      amount: '-'
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
