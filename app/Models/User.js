'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get table() {
    return 'users'
  }

  static get primaryKey() {
    return 'person_id'
  }

  static boot() {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addTrait('ParseQuery', {
      searchableFields: []
    })
    this.addTrait('HasPermission')
    // this.excludeRelations = ['userRole.role']
  }

  person() {
    return this.hasOne('App/Models/Person', 'person_id', 'person_id')
  }

  level() {
    return this.hasOne('App/Models/Level', 'level_id', 'level_id')
  }
}

module.exports = User
