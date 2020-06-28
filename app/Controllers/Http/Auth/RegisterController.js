'use strict'

const User = use('App/Models/User') 
const randomString = require('random-string')
const Mail = use('Mail')

class RegisterController {
    async showRegisterForm({ view }){
        return view.render('auth.register')

    }

    // Create User
    async create({ request, response, session }){
        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password'),
            confirmation_token: randomString({ length: 40 })
        })

        // Send Confirmation Mail
        await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
            message
                .to(user.email)
                .from('support@naijaswift.com')
                .subject('Please confirm your email address')
        })

        // Success Message
        session.flash({
            notification: {
                type: 'success',
                message: 'Registration successful! A Mail has been sent to your email address, please confirm your email address.'
            }
        })

        return response.redirect('back')

    }

    async confirmEmail({ params,session, response }){
        //get user with confirmation token
        const user = await User.findBy('confirmation_token', params.token) 

        //set confirmation to null is active to true
        user.confirmation_token = null
        user.is_active = true

        //update user
        await user.save()

        //display success message
        session.flash({
            notification: {
                type: 'success',
                message: 'Email Confirmation Successful!'
            }
        })

        return response.redirect('/login')
    }
}

module.exports = RegisterController
