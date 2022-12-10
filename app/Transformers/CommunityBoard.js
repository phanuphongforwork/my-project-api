const Transformer = use('App/Transformers/Transformer')

class CommunityBoard extends Transformer {
  async transform() {
    return {
      community_board_id: this.model.community_board_id,
      person_id: this.model.person_id,
      start_date: this.model.start_date,
      end_date: this.model.end_date,
      status: this.model.status,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at,
      person: this.model.person ?? null,
      committee: this.model.committee ?? null
    }
  }
}

module.exports = CommunityBoard
