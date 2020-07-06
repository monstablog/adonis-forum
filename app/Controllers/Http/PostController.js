'use strict'

const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Category = use('App/Models/Category')

class PostController {
    
    async slug ({ params:{slug}, view }) {
        const post = await Post.query().where('slug', slug).with('user').with('category').first()
        const numbers = await Post.getCount()
        const totalusers = await User.getCount()

        return view.render('posts.single', {
            totalusers: totalusers,
            numbers: numbers,
            post: post.toJSON() 
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

    async edit({ params, view }){
        const post = await Post.find(params.id)

        return view.render('posts.edit', {
            post: post
        })
    }

    async update({ params, request, response, session }){

        const post = await Post.find(params.id)

        post.subject = request.input('subject')
        post.body = request.input('body')

        await post.save()

        session.flash({ update: 'Post Updated!' })

        return response.redirect('/')
    }
}

module.exports = PostController
