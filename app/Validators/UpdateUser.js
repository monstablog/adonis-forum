'use strict'

class UpdateUser {
  get rules () {
    return {
      'token': 'required',
      'email': 'required|email',
      'password': 'required|confirmed'
    }
  }

  get messages () {
    return {
      'token:required': 'Reset Failed',
      'email.required': 'Please the {{ field }} is required',
      'email.email': 'Please enter a valid {{ field }} address',
      'password.required': 'Please the {{ field }} is required',
      'password.confirmed': 'The {{ field }} does not match'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = UpdateUser
