const express = require("express");

const { signup, login, logout } = require("../controller/auth.controller");
const authRouter = express.Router();

// Register routes
authRouter.post("/signup", signup);
//login routes
authRouter.post("/login", login);

// Logout route
authRouter.post("/logout", logout);

module.exports = authRouter;
