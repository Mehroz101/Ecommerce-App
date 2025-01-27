const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("Password before hashing:", this.password); 
  this.password = await bcrypt.hash(this.password.trim(), 10); 
  console.log("Password after hashing:", this.password); 
  next();
});
module.exports = mongoose.model("User", userSchema);