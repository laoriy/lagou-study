const mongoose = require('mongoose')
const baseModel = require('./base-model')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  ...baseModel,
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = commentSchema
