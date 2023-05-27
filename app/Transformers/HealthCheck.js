const Transformer = use('App/Transformers/Transformer')

class Activity extends Transformer {
  async transform() {
    return {
      health_check_id: this.model.health_check_id,
      health_check_name: this.model.health_check_name,
      health_check_date: this.model.health_check_date,
      health_check_end: this.model.health_check_end,
      health_check_date: this.model.health_check_date,
      location_name: this.model.location_name,
      status: this.model.status,
      users: this.model.users ?? null,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Activity
