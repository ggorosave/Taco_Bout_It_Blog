const router = require('express').Router();
const { BlogPost } = require('../../models');
// TODO: add in authorization
const { getDate, checkAuth }  = require('../../utils');

// route /blogposts

// route to create a new post
router.post('/', checkAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            // helper
            date: getDate(),
            user_id: req.session.user_id
        });

        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to update a post
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const updatedBlogPost = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
            }
        });

        if (!updatedBlogPost) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(updatedBlogPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to delete a post
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const deletedBlogPost = await BlogPost.destroy({
            where: {
                id: req.params.id
            },
        })

        if (!deletedBlogPost) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(deletedBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;