const Transformer = use('App/Transformers/Transformer')
const HouseholdMember = use('App/Models/HouseholdMember')

class Level extends Transformer {
  async transform() {
    return {
      level_id: this.model.level_id,
      level_name: this.model.level_name,
      status: this.model.status,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Level
