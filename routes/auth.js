const router = require("express").Router();

//Gets The Login Page
router.get("/login", (req, res, next) => {
    res.render("login", { title: "Aroma Shop | Login" });
    next();
});

//Gets The Sign Up Page
router.get("/register", (req, res, next) => {
    res.render("signup", { title: "Aroma Shop | Create Account" });
    next();
})

module.exports = router;