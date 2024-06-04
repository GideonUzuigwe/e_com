const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//Create Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(updatedCart);
    } catch (err) {
        res.status(501).json("Unable to update cart");
    };
});

//Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get User Cart
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userid });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get All Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;