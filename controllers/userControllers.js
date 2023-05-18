const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const maxAge = 60 * 60 * 24
const secret = 'This is my Secret code'
const Blog = require('../models/Blog')

// function to create token
const createToken = (id) => {
    const token = jwt.sign(id, secret);
    return token
}

// render sign-up page
module.exports.signup_get = (req, res) => {
    res.render('user/signup')
}

// sign-up new users
module.exports.signup_post = async (req, res) => {
    let {firstname, lastname, email, password } = req.body

    const salt = await bcrypt.genSalt()
    password = await bcrypt.hash(password, salt)

    User.create({
        firstname,
        lastname,
        email,
        password
    }).then((user) => {
        
        // create authentication token for user
        const token = createToken(user.id)

        // send token as a cookie in response object
        res.cookie('jwt', token, {expiresIn: maxAge * 1000, httpOnly: true})

        res.redirect('/user/my-profile');
    }).catch((err) => {
        console.log(err);
        res.send(err.message)
    })
}

// Login Controller
module.exports.login_get = (req, res) => {
    res.render('user/login')
}

// Find User by E-mail

module.exports.login_post = async (req, res) => {
    const {email, password}= req.body

    const user = await User.findOne({email})
    if(user){
        
        // comapre password

        const auth = await bcrypt.compare(password, user.password)

        
        if(auth){
            // create authentication token for user
            const token = createToken(user.id)

            // send token as a cookie in response object
            res.cookie('jwt', token, {expiresIn: maxAge * 1000, httpOnly: true})

            res.redirect('/user/my-profile')
            
        } else{
            res.send('Incorrect password')
        }
    } else {
        res.send('No user with the  email')
    }
}

// Logout Controller
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {expiresIn: 1})
    res.redirect('/user/login')
}

// profile controller
module.exports.my_profile = async (req, res) => {
    // logged in user
    const user = req.user;
    
    // get user blogs
    const blogs = await Blog.find({user: user})

    res.render('user/my-profile', {blogs})
}

module.exports.user_profile = async (req, res) => {
    const email = req.params.email

    //find user with this email
    const userProfile = await User.findOne({email})

    // check if userProfile is the logged in user
    if (userProfile.id === req.user) {
        res.redirect('/user/my-profile')
    }

    const blogs = await Blog.find({user: userProfile._id})

    res.render('user/user-profile', {userProfile, blogs})
}