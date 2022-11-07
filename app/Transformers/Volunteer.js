const Transformer = use('App/Transformers/Transformer')

class Volunteer extends Transformer {
  async transform() {
    return {
      volunteer_id: this.model.volunteer_id,
      person_id: this.model.person_id,
      status: this.model.status,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Volunteer
