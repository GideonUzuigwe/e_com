const router = require("express").Router();

//Redirect User 
router.get("/", (req, res, next) => {
    res.redirect("/en/home");
    next();
});

//Gets Homepage
router.get("/en/home", (req, res, next) => {
    res.render("index", { title: "Aroma Shop | eCommerce" });
    next();
});

//Gets The Login Page
router.get("/en/login", (req, res, next) => {
    res.render("login", { title: "Aroma Shop | Login" });
    next();
});

//Gets The Sign Up Page
router.get("/en/signup", (req, res, next) => {
    res.render("signup", { title: "Aroma Shop | Create Account" });
    next();
})

module.exports = router;