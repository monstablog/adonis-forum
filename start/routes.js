'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('home')

Route.get('/','PostController.home')

Route.get('/posts/create', 'PostController.create')

Route.get('/posts/:slug','PostController.slug')

Route.post('/posts','PostController.store')

Route.get('/register', 'Auth/RegisterController.showRegisterForm')
Route.post('/register', 'Auth/RegisterController.create').validator('CreateUser').as('register')
Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')


Route.get('/login', 'Auth/LoginController.showLoginForm')
Route.post('/login', 'Auth/LoginController.login').validator('LoginUser').as('login')

Route.get('/password/reset', 'Auth/PasswordResetController.showLinkResetForm')
Route.post('/password/email', 'Auth/PasswordResetController.sendRequestLinkEmail').validator('ResetUser')
Route.get('/password/reset/:token','Auth/PasswordResetController.showResetForm')
Route.post('/password/reset','Auth/PasswordResetController.reset').validator('UpdateUser')

Route.get('/logout', async({ auth, response })=>{
    await auth.logout();
    return response.redirect('/')
})
