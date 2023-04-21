'use strict'

const Controller = use('App/Controllers/Http/Controller')
const Service = use('App/Services/ActivityService')
const Transformer = use('App/Transformers/Activity')

const ExcelJS = require('exceljs')
const dayjs = require('dayjs')
require('dayjs/locale/th')
dayjs.locale('th')

class ActivityController extends Controller {
  async index({ request, response, auth }) {
    const result = await Service.getAll(request.get())

    return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async export({ request, response, auth }) {
    const result = await Service.getAll(request.get())

    const workbook = new ExcelJS.Workbook()

    for (const data of result.data) {
      const worksheet = workbook.addWorksheet(data.activity_name)

      worksheet.mergeCells('A1', 'C1')
      worksheet.mergeCells('A2', 'C2')
      worksheet.mergeCells('A3', 'C3')
      worksheet.mergeCells('A4', 'C4')
      worksheet.mergeCells('A5', 'C5')
      worksheet.mergeCells('A6', 'C6')
      worksheet.mergeCells('A7', 'C7')
      worksheet.mergeCells('A8', 'C8')
      worksheet.mergeCells('A9', 'C9')
      worksheet.getCell('A1').value = data?.activity_name ?? '-'

      worksheet.getCell('A3').value = data?.activity_description
        ? 'รายละเอียด : ' + data?.activity_description
        : 'รายละเอียด :'
      worksheet.getCell('A4').value = data?.agency_name ? 'หน่วยงานที่จัด : ' + data?.agency_name : 'หน่วยงานที่จัด : '
      worksheet.getCell('A5').value =
        'วันที่จัดกิจกรรม : ' +
        dayjs(data.activity_date)
          .add(543, 'year')
          .format('DD MMM YYYY')
      worksheet.getCell('A6').value = data?.location_name
        ? 'สถานที่จัดกิจกรรม : ' + data?.location_name
        : 'สถานที่จัดกิจกรรม :'
      worksheet.getCell('A8').value = 'รายชื่อผู้เข้าร่วมกิจกรรม'

      worksheet.getRow(10).values = ['ชื่อ', 'เบอร์โทรศัพท์', 'วันที่เข้าร่วมกิจกรรม']

      worksheet.columns = [{ key: 'name' }, { key: 'tel' }, { key: 'joinDate' }]

      data.users.forEach(function(item, index) {
        const person = item?.person

        if (person) {
          worksheet.addRow({
            name: person.person_name,
            tel: person.phone,
            joinDate: item.join_date ? dayjs(item.join_date).format('DD MMM YYYY') : '-'
          })
        }
      })

      worksheet.columns.forEach(column => {
        column.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })

      // worksheet.eachRow((Row, rowNum) => {
      //   Row.eachCell(Cell => {
      //     if (rowNum == 1) {
      //       Cell.alignment = {
      //         vertical: 'center',
      //         horizontal: 'center'
      //       }
      //     } else {
      //       Cell.alignment = {
      //         vertical: 'middle',
      //         horizontal: 'middle'
      //       }
      //     }
      //   })
      // })
    }

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer

    // return this.success(response, await Transformer.asyncPaginate(result), 'OK', this.makePaginateMeta(result))
  }

  async store({ request, response }) {
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
        'Delete error'
      )
    }

    return this.success(response, null, 'Delete success')
  }
}

module.exports = ActivityController
