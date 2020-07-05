'use strict'

const User = use('App/Models/User')
const PasswordReset = use ('App/Models/PasswordReset')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')

class PasswordResetController {
    showLinkResetForm ({ view }) {
        return view.render('auth.passwords.email')
    }

    async sendRequestLinkEmail ({ request, session, response }){
        const user = await User.findBy('email', request.input('email'))

        await PasswordReset.query().where('email', user.email).delete()

        const { token } = await PasswordReset.create({
            email: user.email,
            token: randomString({ length: 40 })
        })

        const mailData = {
            user: user.toJSON(),
            token
        }

        await Mail.send('auth.emails.password_reset', mailData, message => {
            message.to(user.email)
            .from('support@naijaswift.com')
            .subject('Naijaswift Forum - Password Reset Link')
        })

        session.flash({
            notification: {
                type: 'success',
                message: 'A password reset link has been sent to your email address.'
            }
        })

        return response.redirect('back')
    }

    showResetForm ({ params, view }){
        return view.render('auth.passwords.reset', { token: params.token })
    }

    async reset ({ request, session, response }){
        
        try {
            // get users email
            const user = await User.findBy('email', request.input('email'))

            //check if token exists
            const token = await PasswordReset.query()
            .where('email', user.email)
            .where('token', request.input('token'))
            .first()
            
            if (!token) {
                session.flash({
                    notification: {
                        type: 'danger',
                        message: 'This password does not match'
                    }
                })
    
                return response.redirect('back')
            }
            user.password = await request.input('password')
            await user.save()

            //delete password token
            await PasswordReset.query().where('email', user.email).delete()

            //display success message
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Your Password has been reset!'
                }
            })

            return response.redirect('/login')

        } catch (error) {
            //display error
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Sorry, there is not user with this email address.'
                }
            })

            return response.redirect('back')
        }
        
    }
}

module.exports = PasswordResetController
