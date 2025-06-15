const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const database = require("./app/config/dbCon");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");

database();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static(path.join(__dirname, "upload")));

// Admin Routing
const publicRoutes = require("./app/routes/admin/publicRoutes.js");
const adminRoutes = require("./app/routes/admin/adminRoutes.js");
app.use(publicRoutes);
app.use(adminRoutes);

// Api Routing
const ApiRouter = require("./app/routes/api/ApiRoute.js");
app.use("/api", ApiRouter);

//Auth Routing
const authRouter = require("./app/routes/auth/authRoutes.js");
app.use("/auth", authRouter);

const port = 5000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000/");
});
