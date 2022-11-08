'use strict'

const isArray = require('lodash/isArray')

class ParseQuery {
  register(Model, customOptions = {}) {
    const { searchableFields = [] } = customOptions

    Model.parseQuery = function({
      q = null,
      filters = [],
      includes = null,
      sort = 'created_at',
      order = 'desc',
      between = null
    }) {
      let model = Model.query()

      if (q) {
        model.where(function() {
          for (let i = 0; i < searchableFields.length; i++) {
            const searchField = searchableFields[i]
            if (searchField.indexOf('.') >= 0) {
              let relation = searchField.split('.')
              let field = relation.pop()
              field = field.replace('#', '.')
              relation = relation.join('.')

              if (i === 0) {
                this.whereHas(relation, builder => {
                  builder.where(field, 'LIKE', `%${q}%`)
                })
              } else {
                this.orWhereHas(relation, builder => {
                  builder.where(field, 'LIKE', `%${q}%`)
                })
              }
            } else {
              if (i === 0) {
                this.where(searchField, 'LIKE', `%${q}%`)
              } else {
                this.orWhere(searchField, 'LIKE', `%${q}%`)
              }
            }
          }
        })
      }

      if (filters) {
        for (let key in filters) {
          const value = filters[key]

          if (key.indexOf('.') > -1 && !key.startsWith('!')) {
            let relations = key.split('.')
            const column = relations.pop()
            relations = relations.join('.')

            model.whereHas(relations, builder => {
              builder.where(column, value)
            })
          } else {
            key = key.replace('!', '')
            model.where(key, value)
          }
        }
      }

      if (between) {
        for (const i in between) {
          const values = between[i].split(',')
          model.whereBetween(i, values)
        }
      }

      if (includes && typeof includes === 'string' && includes.length > 0) {
        const excludeRelations = this.excludeRelations || []
        includes = includes.split(',')
        includes.forEach(include => {
          if (excludeRelations.indexOf(include) === -1) {
            model = model.with(include)
          }
        })
      }

      // if (includes && typeof includes === 'string' && includes.length > 0) {
      //   includes = includes.split(',')
      //   includes.forEach(include => {
      //     model = model.with(include)
      //   })
      // }

      if (isArray(sort) && isArray(order)) {
        for (let i in sort) {
          model.orderBy(sort[i], order[i])
        }
      } else {
        model.orderBy(sort, order)
      }

      return model
    }
  }
}

module.exports = ParseQuery
