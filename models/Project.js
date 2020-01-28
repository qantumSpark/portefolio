const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  imgPath:{
    type: String,
    require:true
  },
  title:{
    type: String,
    require:true
  },
  languages:{
    type: String,
    require:true
  },
  shortDescription:{
    type: String,
    require:true
  },
  longDescription:{
    type: String,
    require:true
  }
})

module.exports = mongoose.model('Project', projectSchema)

