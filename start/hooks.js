const { hooks } = require('@adonisjs/ignitor')

hooks.after.httpServer(() => {
  const Validator = use('Validator')
  const Database = use('Database')
  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return
    }

    const [table, column] = args
    const row = await Database.table(table)
      .where(column, value)
      .first()

    if (!row) {
      throw message
    }
  }

  const uniqueWithSoftDelete = async (data, field, message, args, get) => {
    const query = Database.table(args[0])
      .where(field, data[field])
      .whereNull('deleted_at')

    if (args[2]) {
      if (!args[3]) {
        throw Error('Please provide except value')
      }
      query.whereNot(args[2], args[3])
    }

    const result = await query.count('* as total')

    if (result[0].total > 0) {
      throw message
    }
  }

  const checkSpace = async (data, field, message, args, get) => {
    const value = get(data, field)
    const re = /^[^ ]+$/i

    if (!re.test(value)) {
      throw message
    }
  }

  Validator.extend('exists', existsFn)
  Validator.extend('unique-soft-delete', uniqueWithSoftDelete)
  Validator.extend('check-space', checkSpace)
})
