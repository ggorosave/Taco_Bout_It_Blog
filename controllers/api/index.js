const router = require('express').Router();
// import user, blogpost, and comment routes
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;