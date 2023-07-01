const HealthCheckUser = use('App/Models/HealthCheckUser')
const Transformer = use('App/Transformers/Transformer')

class healthCheckUser extends Transformer {
  async transform() {
    return {
      health_check_id: this.model.health_check_id,
      person_id: this.model.person_id,
      person: this.model.person ?? null,
      status: this.model.status,
      join_date: this.join_date,
      remark: this.remark,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at,
      users:
        (await ActivityUser.query()
          .where('health_check_id', this.model.health_check_id)
          .with('person')
          .fetch()) || []
    }
  }
}

module.exports = healthCheckUser
