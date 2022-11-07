const Transformer = use('App/Transformers/Transformer')

class Committee extends Transformer {
  async transform() {
    return {
      committee_id: this.model.committee_id,
      committee_name: this.model.committee_name,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Committee
