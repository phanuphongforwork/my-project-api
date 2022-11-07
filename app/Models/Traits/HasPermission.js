'use strict'

class HasPermission {
  register(Model, customOptions = {}) {
    Model.prototype.getLevels = async function(levelId = null) {
      const levels = await this.levels().fetch()

      if (levelId) {
        levels.rows = levels.rows.filter(item => {
          return item.id === levelId
        })
      }

      let levelsArray = []

      if (levels.rows.length > 0) {
        levelsArray.push(levels.rows).map(item => {
          return item.level_id
        })
      }

      return levelsArray
    }

    Model.prototype.can = async function(checkLevelId, levelId = null) {
      const levels = await this.getLevels(levelId)

      return levels.includes(checkLevelId)
    }
  }
}

module.exports = HasPermission
