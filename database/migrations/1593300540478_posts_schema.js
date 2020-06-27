'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('subject', 255).notNullable()
      table.text('body').notNullable()
      table.string('slug', 500).notNullable()
      table.string('image', 191).nullable()
      table.integer('user_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
