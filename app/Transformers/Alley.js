const Transformer = use('App/Transformers/Transformer')

class Alley extends Transformer {
  async transform() {
    return {
      alley_id: this.model.alley_id,
      alley_name: this.model.alley_name,
      subdistrict_id: this.model.subdistrict_id,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Alley
