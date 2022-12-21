const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const checkAuth = require('../utils/auth');

// to render all blogposts on homescreen
router.get('/', async (req, res) => {
try {

    // finds all blogpost data and includes user data
    const blogPostData = await BlogPost.findAll({
        include: [ { model: User, attributes: ['name'], }],
    });

    // serializes data for each blogpost
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

    res.render('homepage', {
        blogposts
        // add logged in
    });

} catch(err) {
    res.status(500).json(err);
}
});

// to render blogpast data on blogpost page
router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                
            ],
        });

        const commentData = await Comment.findAll({
            where: {
                blogpost_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        })

        const blogpost = await blogPostData.get({ plain: true });

        const comments = await commentData.map((comment) => comment.get({ plain: true }));

        res.render('blogpost', {
            ...blogpost,
            comments
        });

    } catch(err) {
        res.status(400).json(err);
    }
})

// to render blogpost data on dashboard
router.get('/dashboard', async (req, res) => {
    try {
    
        // finds all blogpost data and includes user data
        const blogPostData = await BlogPost.findAll({
            include: [ { model: User, attributes: ['name'], }],
        });
    
        // serializes data for each blogpost
        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
    
        res.render('dashboard', {
            blogposts
            // add logged in
        });
    
    } catch(err) {
        res.status(500).json(err);
    }
    });

    // renders login page
    router.get('/login', (req, res) => {
        // add logic to redirect if already logged in
        
        res.render('login')
    });

module.exports = router;