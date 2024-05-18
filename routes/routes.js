const router = require("express").Router();

//Gets the homepage
router.get("/", (req, res, next) => {
    res.render("index", { title: "Aroma Shop | eCommerce" });
});

module.exports = router;