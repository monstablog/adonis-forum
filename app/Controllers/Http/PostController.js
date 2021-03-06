'use strict'

const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Category = use('App/Models/Category')
const Database = use('Database')

class PostController {
    
    async slug ({ params:{slug}, view }) {
        const post = await Post.query().where('slug', slug).with('user').with('categories').first()
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

    async just({ params:{id}, view  }){
       
        const category = await Category.findBy('id', id)

        return view.render('posts.new-topic', {
          
            category: category.toJSON()
        })

    }

    async store({ request, response, session, auth }) {
        const { subject, body, categories } = request.all()

        const posted = await auth.user.posts().create({
            subject,
            body,
        })

        if(categories && categories.length > 0  ){
            await posted.categories().attach(categories)
            posted.categories = await posted.categories().fetch()
        }

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
