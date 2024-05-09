const express = require("express");
const app = express();

//Set your application
app.set("view engine", "ejs");

//Use some middlewares in your application
app.use(express.static("public"));

app.listen(3000, console.log("localhost:3000"));

app.get("/", (req, res, next) => {
    res.render("index", { title: "Shop | eCommerce" });
});