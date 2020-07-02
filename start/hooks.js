'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(async ()=> {
    const View = use('View')
    const Env = use('Env')
    const { DateTime } = require('luxon')

    View.global('appUrl', path => {
        const APP_URL = Env.get('APP_URL')

        return path ? `${APP_URL}/${path}` : APP_URL
    })

    View.global('todayDate', () => {
        return DateTime.fromJSDate(new Date()).toFormat('LLLL\',\' d cccc y \'at\' h:m a')
      })
})