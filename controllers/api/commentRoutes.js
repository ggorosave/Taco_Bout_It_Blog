const router = require('express').Router();
const { User, Comment } = require('../../models');
const checkAuth = require('../../utils/auth');

// route to view all comments
router.get('/', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to view a specific comment
router.get('/:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to create a comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to update a comment (if time allows)
router.put('/:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to delete a comment (if time allows)
router.delete('/:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;