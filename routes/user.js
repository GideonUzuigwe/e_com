const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const { cookieAuthorizeUser } = require("../middleware/auth");

//Gets Homepage
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();
        const choiceProducts = await Product.find({ categories: "choice" });
        res.render("index", { title: "Aroma Shop | eCommerce", products, choiceProducts });
    } catch (err) {
        res.status(500).json("Something went wrong")
    }
});

//Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.DES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(501).json("Unable to update user");
    };
});

//Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get All Users
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const user = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get Users Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

//User Logged In
router.get("/en/user", verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        const choiceProducts = await Product.find({ categories: "choice" });
        res.status(200).render("user", { title: "Aroma | Shop", products, choiceProducts, userDetails: req.user });
    } catch (err) {
        res.status(500).json("The router did not work?")
    }
});

//User Account
router.get("/account/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.render("accounts", { title: "Aroma | Shop | Accounts", userDetails: req.user, others })
    } catch (err) {
        console.log(err)
    }
});

//Log Out User


module.exports = router;