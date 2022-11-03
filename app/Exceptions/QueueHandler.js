const Sentry = use('Sentry')

class QueueHandler {
  async report (error, job) {
    Sentry.configureScope(scope => {
      scope.setExtra(job)
    })

    Sentry.captureException(error)
  }
}

module.exports = QueueHandler
