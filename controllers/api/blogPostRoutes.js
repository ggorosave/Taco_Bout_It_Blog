const router = require('express').Router();
const { BlogPost } = require('../../models');
// TODO: add in authorization
const checkAuth = require('../../utils/auth');

// route to get all posts
router.get('/', async (req, res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    }
});

// route to get a specific post
router.get('/:id', async (req, res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    }
})

// route to create a new post
router.post('/', async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create(req.body);

        res.status(200).json(newBlogPost);
    } catch(err) {
        res.status(400).json(err);
    }
});

// route to update a post
router.put('/:id', async (req, res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    }
});

// route to delete a post
router.delete('/:id', async (req, res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;