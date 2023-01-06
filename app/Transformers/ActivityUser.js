const Transformer = use('App/Transformers/Transformer')

class ActivityUser extends Transformer {
  async transform() {
    return {
      activity_id: this.model.activity_id,
      person_id: this.model.person_id,
      person: this.model.person ?? null,
      status: this.model.status,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = ActivityUser
