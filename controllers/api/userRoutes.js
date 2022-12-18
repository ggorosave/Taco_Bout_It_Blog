const router = require('express').Router();
const { User } = require('../../models');

// path to get all user info (for dev use only)
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// path to create user (sign up)
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// TODO: login path

// TODO: profile path? (if time allows)

// TODO: logout path

module.exports = router;