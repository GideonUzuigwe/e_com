
function cookieAuthorizeUser(req, res, next) {
    if (req.cookies._ust) {
        next();
    } else {
        res.redirect("/auth/login");
    }
};

function errorHandler(err, req, res, next) {
    res.status(500).send("Something went wrong")
};

function notFound(req, res, next) {
    res.status(404).send("Sorry can't find that page")
};

module.exports = { cookieAuthorizeUser, errorHandler, notFound };