const router = require('express').Router();
// import user, blogpost, and comment routes
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;