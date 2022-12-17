const checkAuth = (req, res, next) => {
    // checks if user is logged in 
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = checkAuth;