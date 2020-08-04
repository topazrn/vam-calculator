const auth = (req, res, next) => {
    if (req.session.userId === undefined) {
        return res.redirect('/login');
    } else {
        return next();
    }
}

module.exports = auth;