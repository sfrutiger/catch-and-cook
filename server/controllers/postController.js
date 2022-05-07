const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')

// @desc Get posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()

    res.status(200).json(posts)
})

// @desc Create post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {

    const post = await Post.create({
        author: req.body.author,
        species: req.body.species,
        date: req.body.date,
        location: req.body.location,
        conditions: req.body.conditions,
        method: req.body.method,
        details: req.body.details,
        recipes: req.body.recipes
    })
    res.status(200).json(post)
})

module.exports = {
    getPosts,
    createPost
}