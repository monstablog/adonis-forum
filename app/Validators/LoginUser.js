'use strict'

class LoginUser {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Please email {{ field }} is required',
      'email.email': 'Please provide a vaid {{ field }} address',
      'password.required': 'Please enter your {{ field }}'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }

}

module.exports = LoginUser
