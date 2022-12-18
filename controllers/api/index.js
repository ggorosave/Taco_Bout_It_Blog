const router = require('express').Router();
// import user, blogpost, and comment routes
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);

module.exports = router;