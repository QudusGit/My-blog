const express = require('express') // import express module
const mongoose = require('mongoose')
const Blog =require('./models/Blog')
const blogRoutes = require('./routers/blogRoutes')
const userRoutes = require('./routers/userRoutes')
const cookieParser = require('cookie-parser')
const {checkUser} = require('./middleware/auth')

// create express app
const app = express()


// set view engine
app.set('view engine', 'ejs')


// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/myblog')
.then( () => {
    console.log('connected to database')

// start up server
app.listen(3000, ()=>{
    console.log('server listening for requests on port 3000')
})})
.catch( (error) => {
    console.log(error)
})

// set view engine
app.set('view engine', 'ejs')


// middlewares
app.use(express.static('public')) // serving static files
app.use(express.json()) // let your app process JSON data
app.use(express.urlencoded({ extended: true })) // let your app process form data
app.use(cookieParser())


// routes 
// ( '*' = wildcard / to any route )
app.use('*', checkUser)

app.get('/', (req, res) =>{
    // res.send('Welcome to the Homepage!')
    // res.sendFile('/views/index.html', {root: __dirname})
    res.render('index')
})

app.get('/about', (req, res) => {
    // res.send('This is the About Us page')
    // res.sendFile('/views/about.html', {root: __dirname})
    res.render('about')
})

app.get('/contact', (req, res) => {
    // res.send('Contact Us')
    // res.sendFile('/views/contact.html', {root: __dirname})
    res.render('contact')
})

app.get('/services', (req, res) => {
    // res.send('These are the services we have to offer')
    // res.sendFile('/views/services.html', {root: __dirname})
    res.render('services')
})

app.use(blogRoutes)
app.use('/user' ,userRoutes)