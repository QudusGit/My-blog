const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret = 'This is my Secret code'

// require authentication middleware
const requireAuth = (req, res, next) => {

    // get jwt from request
    const token = req.cookies.jwt

    if(token){

        // decode the token
        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                console.log(err.message)
                res.redirect('/user/login')
            }
        // if token is valid
            next()
        })
    } else {
        res.redirect('/user/login')
    }
}


// check logged in user
const checkUser = (req, res, next) => {

    // get jwt from request
    const token = req.cookies.jwt

    if(token){
        // decode the token
        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
        // if token is valid
        User.findById(decodedToken)
        .then(user => {
            req.user = user.id,
            res.locals.user = user;
            next()
        })
      }
    })
    } else {
        res.locals.user = null
        next()
    }
}


// export middlewares
module.exports = { requireAuth, checkUser }