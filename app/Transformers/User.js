const Transformer = use('App/Transformers/Transformer')
const CompanyTransformer = use('App/Transformers/Company')
const EmployeeTransformer = use('App/Transformers/Employee')
const RoleTransformer = use('App/Transformers/Role')
const DepartmentTransformer = use('App/Transformers/V2/DepartmentTransformer')
const get = require('lodash/get')
const MediaTransformer = use('App/Transformers/Media')

class User extends Transformer {
  async transform() {
    return {
      id: this.model.id,
      username: this.model.username,
      email: this.model.email,
      active: this.model.active,
      company_id: this.model.company_id,
      company: CompanyTransformer.make(this.whenLoaded('company')),
      employee: await EmployeeTransformer.asyncMake(this.whenLoaded('employee')),
      companies: CompanyTransformer.collection(this.whenLoaded('companies')),
      roles: RoleTransformer.collection(this.whenLoaded('roles')),
      departments: DepartmentTransformer.collection(this.whenLoaded('departments')),
      userRole: {
        role_id: get(this.model, 'roles.0.id'),
        role: {
          id: get(this.model, 'roles.0.id'),
          slug: get(this.model, 'roles.0.slug'),
          name: get(this.model, 'roles.0.name')
        }
      },
      profile_picture: await MediaTransformer.asyncMake(this.whenLoaded('profile_picture')),
      star: this.model.star,
      is_approver: this.model.is_approver,
      selected_company_id: this.model.selected_company_id,
      created_at: this.model.created_at,
      updated_at: this.model.updated_at
    }
  }
}

module.exports = User
