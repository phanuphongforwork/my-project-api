const difference = require('lodash/difference')
const Database = use('Database')

class Service {
  static withMedia(query, relationName, modelType, collectionName) {
    query.with(relationName, builder => {
      builder.where('model_type', modelType)
      builder.where('collection_name', collectionName)
    })
  }

  static async sync(relation, newIds, isDestroy = false) {
    const items = await relation.fetch()
    const existsIds = items.toJSON().map(item => {
      return item.id
    })
    const willDeleteIds = difference(existsIds, newIds)
    if (isDestroy) {
      await relation.relatedQuery.Model.query()
        .whereIn('id', willDeleteIds)
        .delete()
    }
    await relation.detach(willDeleteIds)
    await relation.attach(newIds)
  }

  static async syncArrayObject(relation, newItems, parentColumnName, parentId, model) {
    const items = await relation.fetch()
    const existsIds = items.toJSON().map(item => {
      return item.id
    })

    const newIds = newItems
      .filter(item => {
        return !!item.id
      })
      .map(item => {
        return item.id
      })

    const willDeleteIds = difference(existsIds, newIds)
    await relation.whereIn('id', willDeleteIds).delete()

    for (let i in newItems) {
      if (newItems[i].id) {
        await model
          .query()
          .where('id', newItems[i].id)
          .update(newItems[i])
      } else {
        newItems[i][parentColumnName] = parentId
        await relation.create(newItems[i])
      }
    }
  }

  static getModel(name) {
    return use(`App/Models/${name}`)
  }
}

module.exports = Service
