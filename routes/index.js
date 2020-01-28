const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const {findAll} = require('../utilities/dbInteractions')
//Models
const Project = require("../models/Project")
const Jumbotron = require("../models/Jumbotron")


//Recupere data 



router.get('/', async (req,res)=>{
  let data = {}
  await findAll(Project, docs => data.projects = docs )

  
  await findAll(Jumbotron, docs => data.jumbotron = docs )

  
  res.render('index', {projects: data.projects, jumbotron: data.jumbotron})
})

module.exports = router