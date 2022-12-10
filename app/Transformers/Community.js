const Transformer = use('App/Transformers/Transformer')

class Community extends Transformer {
  async transform() {
    return {
      comm_id: this.model.comm_id,
      comm_name: this.model.comm_name,
      subdistrict_id: this.model.subdistrict_id,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at,
      subdistrict: this.model.subdistrict ?? null
    }
  }
}

module.exports = Community
