const Config = use('Config')

const check = async (user, checkPermission, roleId = null) => {
  if (user) {
    return await user.can(checkPermission, roleId)
  }

  return false
}


module.exports = {
  check
}
