const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");

let userDetails = [];
//Gets The Login Page
router.get("/login", (req, res, next) => {
    res.render("login", { title: "Aroma Shop | Login" });
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
        res.cookie("userData", userData, {
            expires: new Date(Date.now() + 900000)
        });
        setTimeout(() => {
            res.redirect("/auth/creating");
        }, 2000)
    } catch (err) {
        res.status(500).send(err)
    }
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
        const accessToken = JWT.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, { expiresIn: "3d" });
        const { password, ...others } = user._doc;

        //Append The AccessToken to the Header for easy verification
        res.setHeader("token", `Bearer ${accessToken}`);

        setTimeout(() => {
            res.redirect("/auth/en/user");
        }, 2000);
        userDetails = { ...others, accessToken };
        res.cookie("userDetails", userDetails)
    } catch (err) {
        res.status(500).json(err)
    }
});

//Creating User Account
router.get("/creating", async (req, res) => {
    res.status(200).render("user-create", { title: "Creating Your Account" });
})

//User Logged In
router.get("/en/user", async (req, res) => {
    if (req.cookies.userDetails.isAdmin) {
        res.status(200).json("You are an Admin")
    } else {
        res.status(200).render("user", { title: "Aroma | Shop", userDetails: userDetails });
    }
});

module.exports = router;