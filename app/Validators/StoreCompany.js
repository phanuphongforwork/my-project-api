'use strict'

class StoreCompany {
  get rules() {
    return {
      name: 'required',
      description: 'string',
      budget: 'required|number'
    }
  }
}

module.exports = StoreCompany
