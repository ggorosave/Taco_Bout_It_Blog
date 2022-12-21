const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
// TODO: add in authorization
const checkAuth = require('../../utils/auth');

// route to get all posts
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [{ model: User, attributes: { exclude: ['password', 'email'] } }],
        });

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to get a specific post
router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        }
                    ]
                },
            ],
        });


        if (!blogPostData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to create a new post
router.post('/', async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create(req.body);

        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to update a post
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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