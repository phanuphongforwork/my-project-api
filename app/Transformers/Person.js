const Transformer = use('App/Transformers/Transformer')
const HouseholdMember = use('App/Models/HouseholdMember')

class Person extends Transformer {
  async transform() {
    return {
      person_id: this.model.person_id,
      prefix: this.model.prefix,
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
      username: this.model.username,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at,
      levels: this.model.levels ?? null,
      household_member: await HouseholdMember.query()
        .where('person_id', this.model.person_id)
        .first()
    }
  }
}

module.exports = Person
