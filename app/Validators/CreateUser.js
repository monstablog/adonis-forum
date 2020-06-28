'use strict'

class CreateUser {
  get rules () {
    return {
      'username': 'required|unique:users',
      'email': 'required|email|unique:users',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'username.required': 'Please your {{ field }} is required',
      'username.unique': 'This {{ field }} is already taken',
      'email.required': 'Please your {{ field }} is required.',
      'email.email': 'Please provide a vaid {{ field }} address',
      'email.unique': 'This {{ field }} address already exists',
      'password.required': 'Please your {{ field }} is required'
      
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }


}

module.exports = CreateUser
