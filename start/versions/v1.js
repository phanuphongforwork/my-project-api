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

Route.get('api/v1/users/me', 'UserController.me').middleware(['auth'])

Route.group(() => {})
  .prefix('api/v1')
  .middleware(['auth'])
