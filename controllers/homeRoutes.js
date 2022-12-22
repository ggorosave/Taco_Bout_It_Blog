const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const checkAuth = require('../utils/auth');

// to render all blogposts on homescreen
router.get('/', async (req, res) => {
    try {

        // finds all blogpost data and includes user data
        const blogPostData = await BlogPost.findAll({
            include: [{ model: User, attributes: ['name'], }],
        });

        // serializes data for each blogpost
        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// to render blogpast data on blogpost page
router.get('/blogpost/:id', checkAuth, async (req, res) => {
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
            comments,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(400).json(err);
    }
})

// to render blogpost data on dashboard
router.get('/dashboard', checkAuth, async (req, res) => {
    try {

        // finds all blogpost data and includes user data
        const blogPostData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: User, attributes: ['name'], }],
        });

        // serializes data for each blogpost
        const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

        res.render('dashboard', {
            blogposts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// renders newpost page
router.get('/newpost', checkAuth, (req, res) => {

    res.render('newpost', {
        logged_in: req.session.logged_in
    })
})

// renders data to the editpost page
router.get('/editpost/:id', checkAuth, async (req, res) => {

    try {
        const blogPostData = await BlogPost.findByPk(req.params.id);

        const blogpost = await blogPostData.get({ plain: true });

        res.render('editpost', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

})

// renders signup page
router.get('/signup', (req, res) => {

    res.render('signup')
});

// renders login page
router.get('/login', (req, res) => {
    // add logic to redirect if already logged in
    
    if (req.session.logged_in) {
        res.redirect('dashboard');
    }
    
    res.render('login')
});

module.exports = router;