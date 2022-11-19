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
  Route.resource('alleys', 'AlleyController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('committees', 'CommitteeController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('communities', 'CommitteeController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('community_boards', 'CommunityBoardController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('districts', 'DistrictController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('household_members', 'HouseHoldMemberController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy '
  ])

  Route.resource('households', 'HouseHoldController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('persons', 'PersonController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('roads', 'RoadController').only(['index', 'show', 'store', 'update', 'destroy '])

  Route.resource('subdistricts', 'SubdistrictController').only(['index', 'show', 'store', 'update', 'destroy '])
})
  .prefix('api/v1')
  .middleware(['auth', 'userIsAvailable'])
