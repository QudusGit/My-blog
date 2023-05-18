const { Router } = require("express");
const blogControllers = require('../controllers/blogControllers')
const {requireAuth} = require('../middleware/auth')

// create router object
const router = Router();

// routes
// get all blogs
router.get('/blogs', blogControllers.get_all_blogs)

// create a new blog
router.get('/blogs/new', requireAuth, blogControllers.new_blog_get)

router.post('/blogs/new', requireAuth, blogControllers.new_blog_post)

// delete a single blog
router.delete('/blogs/:id', blogControllers.delete_blog,)

// get a single blog
router.get('/blogs/:id', blogControllers.get_blog)

module.exports = router