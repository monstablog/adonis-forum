'use strict'

const Post = use('App/Models/Post')

class PostController {
    async home ({view}) {
        //Fetch a post
        const posts = await Post.all()

        return view.render('home', { posts: posts.toJSON() })
    }
}

module.exports = PostController
