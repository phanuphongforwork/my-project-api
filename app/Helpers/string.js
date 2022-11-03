'use strict'

/**
 * Generate "random" alpha-numeric string.
 *
 * @param  {number}      length - Length of the string
 * @return {string}   The result
 */
const strRandom = async (length = 40) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

/**
 * Generate "random" alpha-numeric string.
 *
 * @param  {number}      length - Length of the string
 * @type {function(number=): string}
 */
const strRandomAndUuid = async (length = 30) => {
  const { v4 } = require('uuid')

  return v4() + '-' + (await strRandom(length))
}

const isInclude = (includes, checkInclude) => {
  includes = includes.split(',')

  return includes.indexOf(checkInclude) > -1
}

module.exports = {
  strRandom,
  strRandomAndUuid,
  isInclude
}
