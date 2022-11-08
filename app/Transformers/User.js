const Transformer = use('App/Transformers/Transformer')
const get = require('lodash/get')
const LevelTransformer = use('App/Transformers/Level')
const PersonTransformer = use('App/Transformers/Person')

class User extends Transformer {
  async transform() {
    return {
      person_id: this.model.person_id,
      username: this.model.username,
      status: this.model.status,
      level: await LevelTransformer.asyncMake(this.whenLoaded('level')),
      person: await PersonTransformer.asyncMake(this.whenLoaded('person')),
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = User
