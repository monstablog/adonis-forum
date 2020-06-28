'use strict'

const User = use('App/Models/User') 
const Hash = use('Hash')

class LoginController {
    async showLoginForm({ view }){
        return view.render('auth.login')

    }

    async login({ request, auth, response, session }) {
        //get form data
        const { email, password, remember } = request.all()

        //retrieve user's details
        const user = await User.query()
        .where('email', email)
        .where('is_active', true)
        .first()

        
        if (user) {
            //verify user's password
            const passwordVerified = await Hash.verify(password, user.password)

            if (passwordVerified) {
                //login user
                await auth.remember(!!remember).login(user)

                return response.route('/')
            }
        }

        //display error
        session.flash({
            notification: {
                type: 'danger',
                message: `We couldn't find your details. Make sure you have confirmed your email address.`
            }
        })

        return response.redirect('back')
        
    }
}

module.exports = LoginController
