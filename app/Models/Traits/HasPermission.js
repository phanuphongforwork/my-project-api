'use strict'

const { uniq } = require('lodash')

class HasPermission {
  register(Model, customOptions = {}) {
    Model.prototype.getPermissions = async function(roleId = null) {
      let permissions = []
      const roles = await this.roles().fetch()

      if (roleId) {
        roles.rows = roles.rows.filter(item => {
          return item.id === roleId
        })
      }

      let rolesPermissions = []
      for (let role of roles.rows) {
        const rolePermissions = await role.getPermissions()
        rolesPermissions = rolesPermissions.concat(rolePermissions)
      }
      permissions = uniq(permissions.concat(rolesPermissions))

      return permissions
    }

    Model.prototype.can = async function(permission, roleId = null) {
      const permissions = await this.getPermissions(roleId)

      return permissions.includes(permission)
    }
  }
}

module.exports = HasPermission
