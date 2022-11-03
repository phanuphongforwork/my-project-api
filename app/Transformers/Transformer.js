const _get = require('lodash/get')
class Transformer {
  constructor(model) {
    this.model = model
  }

  static make(model, userPermissions = null) {
    if (!model) {
      return null
    }
    return new this(model).transform(userPermissions)
  }

  static async asyncMake(model, userPermissions = null) {
    if (!model) {
      return null
    }

    const transformer = new this(model)
    const transformed = await transformer.transform(userPermissions)

    return transformed
  }

  static collection(modelCollection, userPermissions = null) {
    if (!modelCollection || typeof modelCollection === 'function') {
      return []
    }

    return modelCollection.map((model, index) => {
      return new this(model).transform(userPermissions)
    })
  }

  static async asyncCollection(modelCollection, userPermissions = null) {
    if (!modelCollection || typeof modelCollection === 'function') {
      return []
    }

    const collection = []

    for (let i = 0; i < modelCollection.length; i++) {
      const model = modelCollection[i]
      const transformer = new this(model)
      const transformed = await transformer.transform(userPermissions)

      collection.push(transformed)
    }

    return collection
  }

  static paginate(collection, userPermissions = null) {
    return _get(collection, 'data', []).map(model => {
      return new this(model).transform(userPermissions)
    })
  }

  static async asyncPaginate(collection, userPermissions = null) {
    const items = []

    const data = _get(collection, 'data', [])

    for (let i = 0; i < data.length; i++) {
      const model = data[i]
      const transformer = new this(model)
      const transformed = await transformer.transform(userPermissions)

      items.push(transformed)
    }

    return items
  }

  transform() {
    return this.model
  }

  whenLoaded(relation) {
    return _get(this.model, relation, null)
  }

  async _collection(relation, transformerFile) {
    const model = this.whenLoaded(relation)
    if (!model) {
      return null
    }
    const transformer = use(transformerFile)
    return transformer.asyncCollection(model)
  }

  async _item(relation, transformerFile) {
    const model = this.whenLoaded(relation)
    if (!model) {
      return null
    }
    const transformer = use(transformerFile)
    return transformer.asyncMake(model)
  }
}

module.exports = Transformer
