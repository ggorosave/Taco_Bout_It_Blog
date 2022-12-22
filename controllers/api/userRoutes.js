const router = require('express').Router();
const { User } = require('../../models');

// route /users

// path to create user (sign up)
router.post('/', async (req, res) => {
    try {

        // creates new user with the input data from signup page
        const userData = await User.create(req.body);

        // saves user id and logged in status to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

//login path
router.post('/login', async (req, res) => {
    try {
      
        // finds user data with matching email
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        
        // if user doesn't exist, send an error message
        if(!userData) {

            res.status(400).json({ message: 'Incorrect email or password, please try again.'});
            return;
        }

        // Checks if password is valid and sets it to a variable
        const validPassword = await userData.checkPassword(req.body.password);

        
        // if password is not valid, send an error message
        if (!validPassword) {

            res.status(400).json({ message: 'Incorrect email or password, please try again.'});
            return;
        }

        // saves user id and logged in status to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' })
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// logout path
router.post('/logout', (req, res) => {

    // if the users logged in then destroy the session
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// TODO: profile path? (if time allows)

module.exports = router;