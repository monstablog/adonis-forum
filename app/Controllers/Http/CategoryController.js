'use strict'

const Category = use('App/Models/Category')

class CategoryController {

    async create({ view }){
        return view.render('categories.create')
    }

    async store({ request, response, session }){
        const category = new Category();

        category.name = request.input('name')

        await category.save()

        return response.redirect('/')
    }
}

module.exports = CategoryController
