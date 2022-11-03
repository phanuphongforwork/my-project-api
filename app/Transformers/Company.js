const Transformer = use('App/Transformers/Transformer')

class Company extends Transformer {
  transform() {
    return {
      id: this.model.id,
      name: this.model.name,
      description: this.model.description,
      budget: parseInt(this.model.budget),
      start_working_time: this.model.start_working_time,
      cut_off_time: this.model.cut_off_time,
      over_night: this.model.over_night,
      lat: this.model.lat,
      lng: this.model.lng,
      attendance_radius: this.model.attendance_radius,
      attendance_check_position: this.model.attendance_check_position,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = Company
