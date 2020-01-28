const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jumbotronSchema = new Schema ({
  imgPath:{type:String,required: true},
  title:{type:String,required: true},
  text:{type:String,required: true},
  btnText:{type:String,required: true}
})

module.exports = mongoose.model('Jumbotron', jumbotronSchema)