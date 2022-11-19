const Transformer = use('App/Transformers/Transformer')

class Person extends Transformer {
  async transform() {
    return {
      person_id: this.model.person_id,
      person_name: this.model.person_name,
      id_card: this.model.id_card,
      date_of_birth: this.model.date_of_birth,
      phone: this.model.phone,
      newborn: this.model.newborn,
      pregnant: this.model.pregnant,
      postpartum: this.model.postpartum,
      disabled: this.model.disabled,
      chronic_disease: this.model.chronic_disease,
      violent_behavior: this.model.violent_behavior,
      role: this.model.role,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Person
