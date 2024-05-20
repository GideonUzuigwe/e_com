const express = require("express");
const app = express();
const dbURI = "mongodb+srv://userAccess:user123@cluster0.nodzpc5.mongodb.net/Project3?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");
const router = require("./routes/routes");
const auth = require("./routes/auth");
const dotenv = require("dotenv");
const user = require("./routes/user");

dotenv.config()
//Set the middleware for your application
app.set("view engine", "ejs");

//Use the middlewares in your application
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/users", router);
app.use("/auth/users", auth);
app.use("/api/users", user);
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT || 3000, console.log("localhost:3000"));
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log(err)
    });

