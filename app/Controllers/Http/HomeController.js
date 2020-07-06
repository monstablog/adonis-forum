'use strict'

const Post = use('App/Models/Post')
const User = use('App/Models/User')

class HomeController {
    async home ({ view }){
        //Fetch a post
        const posts = await Post.query().orderBy('id','desc').fetch() 
        const numbers = await Post.getCount()
        const totalusers = await User.getCount()
        return view.render('home', { 
            totalusers: totalusers,
            numbers: numbers,
            posts: posts.toJSON() 
        })
    }

    async just ({ view }){
        const numbers = await Post.getCount()
        const totalusers = await User.getCount()

        return view.render('layouts.auth', { 
            totalusers: totalusers,
            numbers: numbers,
            posts: posts.toJSON() 
        })
    }
  
}

module.exports = HomeController

