class Controller {
  makePaginateMeta(paginateCollection) {
    return {
      total: paginateCollection.total,
      perPage: paginateCollection.perPage,
      page: paginateCollection.page,
      lastPage: paginateCollection.lastPage
    }
  }

  success(response, payload, message = 'Success', meta = [], statusCode = 200) {
    return response.status(statusCode).json({
      data: payload,
      meta,
      message
    })
  }

  fail(response, errors = null, message = 'Error', statusCode = 500) {
    return response.status(statusCode).json({
      errors,
      message
    })
  }

  getService(name, version = null) {
    if (version) {
      return use(`App/Services/${version}/${name}Service`)
    }

    return use(`App/Services/${name}Service`)
  }

  getTransformer(name, version = null) {
    if (version) {
      return use(`App/Transformers/${version}/${name}Transformer`)
    }

    return use(`App/Transformers/${name}Transformer`)
  }
}

module.exports = Controller
