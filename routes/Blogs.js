
const express = require('express')
const {
    getBlogs,
    getoneBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    updateBlogLikes,
    addBlogComment
} = require('../Controllers/controllers') // Make sure this path is correct

const router = express.Router()

// GET all blogs
router.get('/', getBlogs)

// GET single blog
router.get('/:id', getoneBlog)

// POST new blog
router.post('/', createBlog)

// DELETE blog
router.delete('/:id', deleteBlog)

router.patch('/:id', updateBlog);  // For editing blog content

router.patch('/:id/like', updateBlogLikes);  // For likes

router.patch('/:id/comment', addBlogComment); // For adding a comment

module.exports = router