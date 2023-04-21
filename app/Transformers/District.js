const Transformer = use('App/Transformers/Transformer')

class District extends Transformer {
  async transform() {
    return {
      district_id: this.model.district_id,
      district_name: this.model.district_name,

      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = District
