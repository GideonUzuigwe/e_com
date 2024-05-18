const express = require("express");
const app = express();
const dbURI = "mongodb+srv://userAccess:user123@cluster0.nodzpc5.mongodb.net/Project3?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");
const router = require("./routes/routes");
const auth = require("./routes/auth")

//Set the middleware for your application
app.set("view engine", "ejs");

//Use the middlewares in your application
app.use("/api/users", router);
app.use("/auth/users", auth);
app.use(express.static("public"));

// mongoose.connect(dbURI)
//     .then(() => {
//         app.listen(3000, console.log("localhost:3000"));
//     })
//     .catch((err) => {
//         console.log(err)
//     });

app.listen(3000, console.log("localhost:3000"));