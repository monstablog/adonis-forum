'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')

class PostController {
    
    async slug ({ params:{slug}, view }) {
        const post = await Post.findBy('slug',slug)

        return view.render('posts.single', {
            post: post
        })
    }

    async create({ view }){
        const categories = await Category.all()
        

        return view.render('posts.create',{ categories: categories.toJSON() })
    }

    async store({ request, response, session, auth }) {
        const post = request.all()

        const posted = await auth.user.posts().create({
            subject: post.subject,
            body: post.body,
            category_id: post.category_id,
        })

       

        session.flash({ notification: 'Post Added!' })

        return response.redirect('/')
    }
}

module.exports = PostController
