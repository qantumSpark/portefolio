const express = require('express')
const router = express.Router()
const multer = require('multer')
const formatName = require('../utilities/formarted-name')

//Models
const Jumbotron = require('../models/Jumbotron')

//Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/jumbo')
  },
  filename: function (req, file, cb) {
    cb(null, formatName(req,file))
  }
})
const upload = multer({storage:storage})


//ROUTES
//Get
router.get('/', async (req,res)=>{
  const docs = await Jumbotron.find({}).exec()
  res.send(docs)
  
})
//Create 
router.post('/', upload.single('jumboImg'), async (req,res)=>{
  const jumbo = new Jumbotron ({
    imgPath: req.file.path,
    title: req.body.title,
    text: req.body.text,
    btnText: req.body.btnText
  })
  jumbo.save()
  res.send('Succes')
})
// update
router.put('/', async (req,res)=>{
  res.send('update route not done yet')
  })


//Delete


module.exports = router