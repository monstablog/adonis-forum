'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require('moment');
const date = new Date();
const User = use('App/Models/User')

class Post extends Model {
    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/Slugify', {
          fields: {
            slug: 'subject'
          },
          strategy: 'dbIncrement'
        })
    }

      static castDates (field, value) {
        if (field === 'created_at') {
          return value.format('MMM D, YYYY')
        }
      }
    

    categories(){
      return this.belongsToMany('App/Models/Category')
    }

    user(){
      return this.belongsTo('App/Models/User')
    }
}

module.exports = Post
