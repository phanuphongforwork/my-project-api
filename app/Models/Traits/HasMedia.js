'use strict'

const _ = require('lodash')
const MediaService = use('App/Services/MediaService')

class HasMedia {
  register(Model, customOptions = {}) {
    const collection = 'default'

    const defaultOptions = { modelType: 'App/Models/' }
    const options = _.extend({}, defaultOptions, customOptions)

    Model.prototype.addMedia = async function(
      files,
      collectionName,
      startOrdering = 1
    ) {
      collectionName = collectionName ? collectionName : collection

      const media = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const payload = {
          name: file.clientName,
          collection_name: collectionName,
          model_id: this.primaryKeyValue,
          model_type: options['modelType'],
          order_column: startOrdering,
          mime_type: _.get(file, 'headers.content-type', null)
        }

        const createdMedia = await MediaService.create(payload, file)
        media.push(createdMedia)
        startOrdering++
      }

      return media
    }

    Model.prototype.editMedia = async function(files, collectionName) {
      collectionName = collectionName ? collectionName : collection

      await MediaService.delete(
        this.primaryKeyValue,
        options['modelType'],
        collectionName
      )

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const payload = {
          name: file.clientName,
          collection_name: collectionName,
          model_id: this.primaryKeyValue,
          model_type: options['modelType'],
          order_column: i + 1
        }

        await MediaService.create(payload, file)
      }
    }

    Model.prototype.getMedia = async function(collectionName) {
      collectionName = collectionName ? collectionName : collection
      return await MediaService.getByHasMedia(
        this.primaryKeyValue,
        options['modelType'],
        collectionName
      )
    }

    Model.prototype.getFirstMedia = async function(collectionName) {
      collectionName = collectionName ? collectionName : collection
      return await MediaService.getByHasMedia(
        this.primaryKeyValue,
        options['modelType'],
        collectionName,
        true
      )
    }

    Model.prototype.geLatestOrdering = async function(collectionName) {
      collectionName = collectionName ? collectionName : collection
      return await MediaService.getLatestOrdering(
        this.primaryKeyValue,
        options['modelType'],
        collectionName
      )
    }
  }
}

module.exports = HasMedia
