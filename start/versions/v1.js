const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

/*
 * Auth
 */

// Login
Route.post('api/v1/auth/login', 'Auth/LoginController.index').middleware('guest')

Route.get('api/v1/persons/me', 'PersonController.me').middleware(['auth'])

Route.group(() => {
  Route.post('exports/house-holds', 'ExportController.houseHolds').middleware(['auth'])

  Route.resource('levels', 'LevelController').only(['index'])

  Route.resource('house-hold-members', 'HouseHoldMemberController').only(['index', 'store'])

  Route.resource('alleys', 'AlleyController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('activities', 'ActivityController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('committees', 'CommitteeController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('communities', 'CommunityController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.get('community-boards/get-available', 'CommunityBoardController.getAvailable')
  Route.resource('community-boards', 'CommunityBoardController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('districts', 'DistrictController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.get('house-holds/get-my-house', 'HouseHoldController.getMyHouse')
  Route.get('house-holds/:id/get-user-in-house', 'HouseHoldController.getUserInHouse')
  Route.resource('house-holds', 'HouseHoldController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.post('persons/levels', 'PersonController.updatePersonLevel')
  Route.post('persons/not-in-activity', 'PersonController.getNotInActivity')
  Route.get('persons/available', 'PersonController.getAvailable')
  Route.resource('persons', 'PersonController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('roads', 'RoadController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('subdistricts', 'SubdistrictController').only(['index', 'show', 'store', 'update', 'destroy '])
})
  .prefix('api/v1')
  .middleware(['auth', 'userIsAvailable'])
