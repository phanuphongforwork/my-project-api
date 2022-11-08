'use strict'

class HasPermission {
  register(Model, customOptions = {}) {
    Model.prototype.getLevels = async function() {
      const levels = await this.level().fetch()

      let levelsArray = []

      if (levels.rows.length > 0) {
        levelsArray.push(levels.rows).map(item => {
          return item.level_id
        })
      }

      return levelsArray
    }

    Model.prototype.can = async function(checkLevelId) {
      const levels = await this.getLevels(levelId)

      return levels.includes(checkLevelId)
    }
  }
}

module.exports = HasPermission
