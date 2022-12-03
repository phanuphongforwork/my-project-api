const Transformer = use('App/Transformers/Transformer')

class HouseHoldMember extends Transformer {
  async transform() {
    return {
      house_id: this.model.house_id,
      person_id: this.model.person_id,
      member_status: this.model.member_status,
      status: this.model.status,
      person: this.model.person ?? null,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = HouseHoldMember
