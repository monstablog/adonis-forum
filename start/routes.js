'use strict'

const { get } = require('@adonisjs/framework/src/Route/Manager')

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

Route.get('/','HomeController.home')

Route.group(()=>{
    Route.get('/create', 'PostController.create')
    Route.post('/store','PostController.store')
    Route.get('/edit/:id', 'PostController.edit')
    Route.put('/:id', 'PostController.update')
}).prefix('/posts').middleware('auth')

Route.get('/posts/:slug','PostController.slug')

Route.get('create/:id', 'PostController.just')



Route.get('/categories/create', 'CategoryController.create').middleware(['auth'])
Route.post('/categories','CategoryController.store')

Route.get('/register', 'Auth/RegisterController.showRegisterForm').middleware('stranger')
Route.post('/register', 'Auth/RegisterController.create').validator('CreateUser').as('register')
Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')


Route.get('/login', 'Auth/LoginController.showLoginForm').middleware('stranger')
Route.post('login', 'Auth/LoginController.login').validator('LoginUser').as('login')

Route.get('/password/reset', 'Auth/PasswordResetController.showLinkResetForm').middleware('stranger')
Route.post('/password/email', 'Auth/PasswordResetController.sendRequestLinkEmail').validator('ResetUser')
Route.get('/password/reset/:token','Auth/PasswordResetController.showResetForm')
Route.post('/password/reset','Auth/PasswordResetController.reset').validator('UpdateUser')

Route.get('/logout', async({ auth, response })=>{
    await auth.logout();
    return response.redirect('/')
})

//Category Link
Route.get('/:slug', 'MainCategoryController.index')
