const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken")

//Gets The Login Page
router.get("/login", (req, res, next) => {
    res.render("login", { title: "Aroma Shop | Login" });
    next();
});

//Gets The Sign Up Page
router.get("/register", (req, res, next) => {
    res.render("signup", { title: "Aroma Shop | Create Account" });
    next();
});

//Register User
router.post("/register", async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.DES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const userData = await newUser.save()
        res.status(201).json(userData)
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
        },
            process.env.JWT_SEC_KEY, { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;