const { Router } = require('express');
const userControllers = require('../controllers/userControllers')
const {requireAuth} = require('../middleware/auth')

// create router object
const router = Router()

// routes
// sign-up route
router.get ('/signup', userControllers.signup_get)
router.post ('/signup', userControllers.signup_post)

// login route
router.get ('/login', userControllers.login_get)
router.post ('/login', userControllers.login_post)

// logout route
router.get ('/logout', userControllers.logout_get)

// profile page route
router.get('/my-profile', requireAuth, userControllers.my_profile)
router.get('/profile/:email', userControllers.user_profile)

// export router
module.exports = router