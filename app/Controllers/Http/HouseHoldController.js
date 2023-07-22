'use strict'

const Controller = use('App/Controllers/Http/Controller')
const Service = use('App/Services/HouseHoldService')
const Transformer = use('App/Transformers/HouseHold')
const HouseHoldMember = use('App/Transformers/HouseHoldMember')

const ExcelJS = require('exceljs')
const dayjs = require('dayjs')
require('dayjs/locale/th')
dayjs.locale('th')

class HouseHoldController extends Controller {
  async index({ request, response, auth }) {
    const result = await Service.getAll(
      request.get(),
      auth.user.role,
      auth.user.person_id,
      false,
      auth.user.district_id
    )

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async export({ request, response, auth, params }) {
    const { id } = params

    const result = await Service.getById(id, {
      includes: 'members.person,community,alley,road,subdistrict,person,volunteer,district,members'
    })

    const workbook = new ExcelJS.Workbook()

    const worksheet = workbook.addWorksheet('ทะเบียนครัวเรือน')

    const members = result?.members || []

    worksheet.mergeCells('A1', 'N1')
    worksheet.mergeCells('A2', 'N2')
    worksheet.mergeCells('A3', 'N3')
    worksheet.mergeCells('A4', 'N4')
    worksheet.mergeCells('A5', 'N5')
    worksheet.mergeCells('A6', 'N6')
    worksheet.mergeCells('A7', 'N7')
    worksheet.mergeCells('A8', 'N8')
    worksheet.mergeCells('A9', 'N9')
    worksheet.mergeCells('A10', 'N10')
    worksheet.mergeCells('A11', 'N11')
    worksheet.mergeCells('A12', 'N12')

    worksheet.getCell('A1').value = 'ทะเบียนครัวเรือน'

    worksheet.getCell('A3').value = result?.house_number ? 'บ้านเลขที่ : ' + result?.house_number : 'บ้านเลขที่ :'
    worksheet.getCell('A4').value = 'ชุมชน : สงวนคำ'
    worksheet.getCell('A5').value = result?.alley?.alley_name ? 'ซอย : ' + result?.alley?.alley_name : 'ซอย :'
    worksheet.getCell('A6').value = 'ถนน : เพชรเกษม'
    worksheet.getCell('A7').value = 'แขวง : หนองค้างพลู'
    worksheet.getCell('A8').value = 'เขต : หนองแขม'
    worksheet.getCell('A9').value = result?.subdistrict?.post_code
      ? 'รหัสไปรษณีย์ : ' + result?.subdistrict?.post_code
      : 'รหัสไปรษณีย์ :'
    worksheet.getCell('A10').value = result?.person?.phone
      ? 'เบอร์โทรศัพท์ : ' + result?.person?.phone
      : 'เบอร์โทรศัพท์ :'

    worksheet.getCell('A11').value = result?.person?.phone
      ? 'หัวหน้าครัวเรือน : ' + result?.person?.person_name
      : 'หัวหน้าครัวเรือน :'

    worksheet.getCell('A12').value = `จำนวนสมาชิก ${members?.length || 0} คน`

    worksheet.getRow(14).values = [
      'ชื่อ-สกุล',
      'อายุ ปี/เดือน',
      'วัน/เดือน/ปีเกิด',
      'อายุต่ำกว่า 6 เดือน',
      '6 เดือน - 2 ปีครึ่ง',
      '2 ปีครึ่ง - 6 ปี',
      'หญิงตั้งครรภ์ อายุ 20 ปีขึ้นไป',
      'หญิงตั้งครรภ์ อายุต่ำกว่า 20 ปี',
      'หญิงหลังคลอด',
      'ผู้สูงอายุ',
      'ผู้พิการ',
      'ผู้ป่วยเรื้อรัง',
      'มีพฤติกรรมเสี่ยงด้านความรุนแรง',
      'หมายเหตุ'
    ]

    worksheet.columns = [
      { key: 'name' },
      { key: 'age' },
      { key: 'dob' },
      { key: 'col1' },
      { key: 'col2' },
      { key: 'col3' },
      { key: 'col4' },
      { key: 'col5' },
      { key: 'col6' },
      { key: 'col7' },
      { key: 'col8' },
      { key: 'col9' },
      { key: 'col10' },
      { key: 'col11' }
    ]

    members.forEach(member => {
      const person = member?.person || null
      const check = '✓'
      worksheet.addRow({
        name: person?.person_name,
        age: dayjs().diff(person?.date_of_birth, 'year'),
        dob: dayjs(person?.date_of_birth).format('DD MMM YYYY'),
        col1: person?.newborn === '1' ? check : '',
        col2: person?.newborn === '2' ? check : '',
        col3: person?.newborn === '3' ? check : '',
        col4: person?.pregnant === '2' ? check : '',
        col5: person?.pregnant === '1' ? check : '',
        col6: person?.postpartum === '1' || person?.postpartum === 1 ? check : '',
        col7: dayjs().diff(person?.date_of_birth, 'year') >= 60 ? check : '',
        col8: person?.disabled === '1' || person?.disabled === 1 ? check : '',
        col9: person?.chronic_disease === '1' || person?.chronic_disease === 1 ? check : '',
        col10: person?.violent_behavior === '1' || person?.violent_behavior === 1 ? check : '',
        col11: ''
      })
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

  async getUserInHouse({ request, response, auth, params }) {
    const result = await Service.getUserInHouse(params.id)

    return this.success(response, await HouseHoldMember.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async getMyHouse({ request, response, auth, params }) {
    const result = await Service.getMyHouse(request.get(), auth.user.person_id)

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async store({ request, response, auth }) {
    const payload = request.post()
    const result = await Service.create(payload)

    return this.success(response, await Transformer.asyncMake(result))
  }

  async show({ params, response, request }) {
    const result = await Service.getById(params.id, request.get())

    return this.success(response, await Transformer.asyncMake(result))
  }

  async update({ params, request, response }) {
    const id = params.id
    const payload = request.post()

    try {
      const result = await Service.update(id, payload)

      return this.success(response, await Transformer.asyncMake(result), 'Update success')
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Update error'
      )
    }
  }

  async destroy({ params, response }) {
    try {
      await Service.delete(params.id)
    } catch (ex) {
      return this.fail(
        response,
        {
          message: ex.message
        },
        'Delete user error'
      )
    }

    return this.success(response, null, 'Delete success')
  }
}

module.exports = HouseHoldController
