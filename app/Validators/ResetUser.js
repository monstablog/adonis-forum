'use strict'

class ResetUser {
  get rules () {
    return {
      'email': 'required|email'
    }
  }

  get messages() {
    return {
      'email.required': 'Please your {{ field }} is required.'
    }
  }
}

module.exports = ResetUser
