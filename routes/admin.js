const express = require('express')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const router = express.Router()

//Get all admins
router.get('/',async (req, res)=>{
  const admins = await Admin.find({}).exec()
  res.send(admins)
})
//Get one admin
router.get('/',async (req, res)=>{
  const admins = await Admin.findOne({login:req.body.login}).exec()
  res.send(admins)
})
//Add Admin
router.post('/', async (req,res)=>{
  req.body.password !== req.body.password2 ? res.send('Password do not match') : console.log('password match')
  let passwordHash = bcrypt.hashSync(req.body.password, 10)
  const admin = new Admin({
    login: req.body.login,
    password: passwordHash
  })
  console.log(admin);
  await admin.save()
  .then(()=>{
    res.send('succes')
  })
  .catch(err => console.log(err))
})
//Update Admin
router.put('/',async (req, res)=>{

  const admins = await Admin.updateOne({login:req.body.login}, {login:req.body.loginU, password: req.body.password}).exec()
  res.send(admins)
})
//Delete Admin
router.delete('/', async (req,res)=>{
  //check if last admin in dtb
  let admins = await Admin.find({}).exec()
  console.log(admins.length);
  
  if(admins.length == 1){
    res.send('Warning!! Cannot delete last Admin in the database')
  } else {
    Admin.findOneAndDelete({login:req.body.login},(err, doc)=>{
      if(err) throw err
      !doc ? res.send('Cannot find this admin') : res.send('Admin deleted successfully')
    })
  }
})


module.exports = router