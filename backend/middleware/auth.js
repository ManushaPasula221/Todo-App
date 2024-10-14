const checkAuth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next(); // Proceed to the next middleware or route handler
    } else {
        console.warn('Unauthorized access attempt detected'); // Log the attempt
        return res.redirect('/login'); // Redirect to the login page
    }
};

module.exports = checkAuth;