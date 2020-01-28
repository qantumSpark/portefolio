const express = require('express')
const router = express.Router()
const {findOne, findAll, updateOne, deleteOne} = require('../utilities/dbInteractions')
const Project = require("../models/Project");

router.get('/',async (req,res)=>{
  let data = {}
  await findAll(Project, docs => data.project = docs)
  res.send(data)
})

module.exports = router