const Transformer = use('App/Transformers/Transformer')

class SubDistrict extends Transformer {
  async transform() {
    return {
      subdistrict_id: this.model.subdistrict_id,
      subdistrict_name: this.model.subdistrict_name,
      post_code: this.model.post_code,
      district_id: this.model.district_id,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = SubDistrict
