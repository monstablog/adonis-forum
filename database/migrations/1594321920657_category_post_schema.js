'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryPostSchema extends Schema {
  up () {
    this.create('category_post', (table) => {
      table.increments()
      table.integer('post_id').unsigned().index('post_id')
      table.integer('category_id').unsigned().index('category_id')
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.foreign('category_id').references('categories.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('category_post')
  }
}

module.exports = CategoryPostSchema
