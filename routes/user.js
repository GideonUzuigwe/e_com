const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const CryptoJS = require("crypto-js");

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

module.exports = router;