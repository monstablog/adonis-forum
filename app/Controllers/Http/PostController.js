'use strict'

const Post = use('App/Models/Post')

class PostController {
    async slug ({ params:{slug}, view }) {
        const post = await Post.findBy('slug',slug)

        return view.render('posts.single', {
            post: post
        })
    }

    async create({ view }){
        return view.render('posts.create')
    }

    async store({ request, response, session }) {
        const post = new Post();

        post.subject = request.input('subject')
        post.body = request.input('body')

        await post.save()

        session.flash({ notification: 'Post Added!' })

        return response.redirect('/')
    }
}

module.exports = PostController
