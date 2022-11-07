const Transformer = use('App/Transformers/Transformer')

class Road extends Transformer {
  async transform() {
    return {
      road_id: this.model.road_id,
      road_name: this.model.road_name,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Road
