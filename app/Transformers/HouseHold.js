const Transformer = use('App/Transformers/Transformer')

class HouseHold extends Transformer {
  async transform() {
    return {
      house_id: this.model.house_id,
      comm_id: this.model.comm_id,
      alley_id: this.model.alley_id,
      road_id: this.model.road_id,
      person_id: this.model.person_id,
      subdistrict_id: this.model.subdistrict_id,
      volunteer_id: this.model.volunteer_id,
      phone: this.model.phone,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = HouseHold
