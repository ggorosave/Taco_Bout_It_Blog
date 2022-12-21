const router = require('express').Router();
const { BlogPost, User } = require('../models');
const checkAuth = require('../utils/auth');

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

module.exports = router;