const express = require("express");
const multer = require('multer')
const fs = require('fs');
const {findAll} = require('../utilities/dbInteractions')
const router = express.Router();
const Project = require("../models/Project");
const formatName = require('../utilities/formarted-name')
//Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/projects')
  },
  filename: function (req, file, cb) {
    cb(null, formatName(req,file))
  }
})
const upload = multer({storage:storage})


//Get all projects stored in the database
router.get("/",async (req, res) => {
  await Project.find({}, (err, docs)=>{
    if(err) throw err
    console.log(docs);
    res.send(docs);
  })
});

//Get 1 project with title
router.get("/:projectTitle",async (req, res) => {
  const projects = await Project.findOne({ title: req.params.projectTitle }).exec((err) => {
    if (err) throw err;
  })
  res.send(projects);
});

//Add a new project to dtb
router.post("/",upload.single('img'), async (req, res) => {
  console.log(req.file);
  
  
  const project = new Project(
    ({
      title,
      languages,
      shortDescription,
      longDescription,
    } = req.body)
  );
  project.imgPath = req.file.path
  
  await project.save(err => {
    if(err) throw err
    res.send("sucess")
  })
  
});

//Update a project 
router.put("/", async (req, res) => {
    // console.log('id: ', id)
    // console.log('update: ', update)
    await Project.updateOne(
      {title: req.body.title},
      {
        imgPath: req.body.imgPath,
        title: req.body.titleU,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        languages: req.body.languages
      },
      {
        omitUndefined:true
      },
      (err, docs) => {
        if (err) throw err;
        console.log(docs);
      });
      res.send("success");
});
//Delete project with id
router.delete("/:id",async (req, res) => {
  await Project.findByIdAndDelete(req.params.id, (err,docs) =>{
    if(err) throw err
    console.log(docs);
    
    let path = docs.imgPath
    fs.unlink(path, err => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("delete successful");
      }
    })
  })
})

module.exports = router;

// function format(fileRequest) {
//   const ext = '.'+fileRequest.mimetype.slice(6)
//   let date = new Date
//   date =  date.toISOString()
//   fileRequest.filename = date+ '_' +fileRequest.fieldname +ext
//   fileRequest.path = "public/img/" +fileRequest.filename
// }
