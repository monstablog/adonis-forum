'use strict'

const User = use('App/Models/User') 

class LoginController {
    async showForm({ view }){
        return view.render('auth.login')

    }

    async login({ request, auth, response, session }) {
        const { email, password }  = request.all();

        try {
            await auth.attempt(email, password);
            return response.redirect('/');
        } catch (error) {
            session.flash({loginError: 'Your email or password does not match.'});
            return response.redirect('/login');
        }
    }
}

module.exports = LoginController
