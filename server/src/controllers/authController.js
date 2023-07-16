const mongoose = require("mongoose");
const User = require("../models/user");

// Login
const login = async (req, res) => {
  try {
    const userdata = req.body;
    const data = await User.findOne({
      $or: [{ email: userdata.user }, { phoneNumber: userdata.user }],
    });
    if (data) {
      if (data.password === userdata.password) {
        res.send(data);
      } else {
        res.send("INCORRECT PASSWORD");
      }
    } else {
      res.send("USER NOT FOUND");
    }
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

// Signup
const signup = async (req, res) => {
  try {
    const userdata = req.body;
    const data = await User.findOne({
      $or: [{ email: userdata.email }, { phoneNumber: userdata.phoneNumber }],
    });
    if (data) {
      res.send("USER ALREADY EXIST");
    } else {
      const createdUser = await User.create(userdata);
      res.send(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

// Google authentication
const googleAuth = async (req, res) => {
  try {
    const userdata = req.body;
    const data = await User.findOne({ email: userdata.email });
    if (data) {
      res.send(data);
    } else {
      const createdUsers = await User.create(userdata);
      res.send(createdUsers);
    }
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

module.exports = {
  login,
  signup,
  googleAuth,
};
