const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cookie = require("cookie-parser");
const { errorHandler, notFound } = require("./middleware/auth");

dotenv.config();
//Set the middleware for your application
app.set("view engine", "ejs");

//Use the middlewares in your application
app.use(cookie())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT || 3000, console.log("localhost:3000"));
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.redirect("/api/user");
})

//Render 404 Page
app.use(notFound);

//Handle errors
app.use(errorHandler);