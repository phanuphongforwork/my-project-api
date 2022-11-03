const moment = require('moment')

const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY'
const DEFAULT_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'

const formatDate = (date, format = DEFAULT_DATE_FORMAT) => {
  if (date) {
    return moment(date).format(format)
  }

  return ''
}

const formatDateTime = (date, format = DEFAULT_DATETIME_FORMAT) => {
  if (date) {
    return moment(date).format(format)
  }

  return ''
}

module.exports = {
  formatDate,
  formatDateTime
}
