const Transformer = use('App/Transformers/Transformer')

class Activity extends Transformer {
  async transform() {
    return {
      activity_id: this.model.activity_id,
      activity_name: this.model.activity_name,
      activity_description: this.model.activity_description,
      activity_date: this.model.activity_date,
      activity_end_date: this.model.activity_end_date,
      agency_name: this.model.agency_name,
      location_name: this.model.location_name,
      status: this.model.status,

      users: this.model.users ?? null,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Activity
