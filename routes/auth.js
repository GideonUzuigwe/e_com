const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");

let userDetails = [];
//Gets The Login Page
router.get("/login", (req, res, next) => {
    const query = req.query.newAccount;
    if (query) {
        res.render("login", { title: "Aroma Shop | Login", newAccount: true });
    } else {
        res.render("login", { title: "Aroma Shop | Login" });
    }

});

//Gets The Sign Up Page
router.get("/register", (req, res, next) => {
    res.render("signup", { title: "Aroma Shop | Create Account" });
});

//Register User
router.post("/register", async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.DES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const userData = await newUser.save();
        setTimeout(() => {
            res.redirect("/auth/creating");
        }, 2000)
    } catch (err) {
        res.status(500).send(err)
    }
});

//Creating User Account
router.get("/creating", async (req, res) => {
    res.status(200).render("user-create", { title: "Creating Your Account", newAccount: true });
});

//Login User
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong Credentials")
        }
        const hashPassword = CryptoJs.DES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPassword = hashPassword.toString(CryptoJs.enc.Utf8);
        if (OriginalPassword !== req.body.password) {
            return res.status(401).json("Wrong Credentials");
        }

        //Create the JWT access token
        const accessToken = JWT.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, { expiresIn: "3d" });

        //Add the JWT Token to the cookie for easy assessment
        res.cookie("token", accessToken, {
            httpOnly: true
        });

        const { password, ...others } = user._doc;
        userDetails = { ...others, accessToken };

        setTimeout(() => {
            res.redirect("/api/user/en/user")
        }, 2000)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;