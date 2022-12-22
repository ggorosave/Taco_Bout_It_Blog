const router = require('express').Router();
const { Comment } = require('../../models');
const checkAuth = require('../../utils/auth');

// route /comments

// route to create a comment
router.post('/', checkAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to update a comment (if time allows)
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!updatedComment[0]) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to delete a comment (if time allows)
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        })

        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;