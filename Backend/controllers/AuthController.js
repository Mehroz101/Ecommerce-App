const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUsernameExist = await User.find({ username });
    const isUserEmailExist = await User.find({ email });
    console.log(isUsernameExist.length, isUserEmailExist);
    if (isUsernameExist.length == 0 && isUserEmailExist.length == 0) {
      const user = new User({ username, email, password });
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Username or email already exist" });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User found:", user); 

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("Plaintext password from request:", password); 
    console.log("Hashed password from database:", user.password); 

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      user.password
    ); 
    console.log("Password comparison result:", isPasswordValid); 

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ success: true, message: "Login successful", token: token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
