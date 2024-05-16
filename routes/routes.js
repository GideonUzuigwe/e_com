const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.redirect("/en/home");
});

router.get("/en/home", (req, res, next) => {
    res.render("index", { title: "Shop | eCommerce" });
});

module.exports = router;