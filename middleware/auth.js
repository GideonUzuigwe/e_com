
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

function setTokenInHeader(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        res.setHeader("Authorization", `Bearer ${token}`);
    }
    next();
}

module.exports = { cookieAuthorizeUser, errorHandler, notFound, setTokenInHeader };