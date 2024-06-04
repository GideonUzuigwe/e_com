const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");

//Gets Homepage
router.get("/", (req, res, next) => {
    res.render("index", { title: "Aroma Shop | eCommerce" });
});

//Update User
router.put("/:id", async (req, res) => {
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

//User Account
router.get("/account/:id", async (req, res) => {
    res.status(200).json(req.header)
    // res.status(200).json(req.user);
})


module.exports = router;