const Blog = require('../models/Blog')

// controller to get all blogs
module.exports.get_all_blogs = async (req, res) => {    
    const blogs = await Blog.find().populate('user').sort({'updatedAt': 'desc'})
    res.render('allblogs', {blogs})
}

// render view for new blog
module.exports.new_blog_get = (req, res) => {
    res.render('newblog')
}

// create new blog
module.exports.new_blog_post = (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const user = req.user

    // create a single blog
    Blog.create({
        title: title,
        body: body,
        user
    }).then((blog) => {
        res.redirect('/blogs');
    }).catch((error) => {
        console.log(error);
    })
}

// get single blog
module.exports.get_blog = async function (req, res) {
    const id = req.params.id

    // find single blog
    try {
        const blog = await Blog.findById(id).populate('user')
        res.render('singleblog', { blog })

    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

// AndDelete(id)
//.then(() => {
    //console.log('Blog deleted Sucessfully')
  //  res.json({redirect: '/blogs'})
//})
//.catch(err => {
  //  console.log(err)
//    res.json(err)
//})

// delete blog
module.exports.delete_blog = async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)

    if (blog.user.id === req.user) {
        console.log('delete')
        blog.remove()
        res.redirect('/blogs')
    } else {
        console.log('not delete')
        res.send('You are not authorised to delete this blog')
    }
}