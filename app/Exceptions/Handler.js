'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(422).send(error.messages)
    }

    return super.handle(...arguments)
    // response.status(error.status).send({
    //   message: error.message + error.lineNumber,
    //   file: error.file,
    //   line: error.line
    // })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
}

module.exports = ExceptionHandler
