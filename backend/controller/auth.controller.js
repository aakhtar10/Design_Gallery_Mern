const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../model/user.model");
const { tokenModel } = require("../model/token.model");

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  const saltRounds = 10;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).send("Email already registered");
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        res.status(200).send({ msg: `find err` });
      } else {
        const user = new userModel({ username, email, password: hash, role });
        await user.save();
        res.status(200).send({ msg: `user registered successfully` });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Something went wrong");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.username, role: user.role },
            process.env.SECRET_KEY
          );
          res.status(200).send({ msg: "Login successful", token });
          console.log("login successfully");
        } else {
          res.status(400).send("Invalid credentials");
        }
      });
    } else {
      res.status(200).send("User not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send("Something went wrong");
  }
};

const logout = async (req, res) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).send({ error: "Authorization header not found" });
  }
  const token = header.split(" ")[1];
  try {
    if (!token) {
      res.status(401).send({ msg: "No token provided" });
    }
    const userToken = new tokenModel({ token });
    await userToken.save();
    res.status(200).send({ msg: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
