require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const multer = require('multer')

//mongoDB
mongoose.connect(process.env.DTB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
mongoose.connection.on('err', ()=>console.log(err))
mongoose.connection.once('open', ()=>console.log('Connected to mongodb'))


const app = express()
//Midleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', 'layouts/layout');
//Bodyparser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Multer


//Routes
app.use('/', require('./routes/index'))
app.use('/projects', require('./routes/projects'))
app.use('/admin', require('./routes/admin'))
app.use('/jumbotron', require('./routes/jumbotron'))

app.use('/dashboard', require('./routes/dashboard'))



let port = process.env.PORT
app.listen(port, ()=>console.log('Server is open on port: '+port))