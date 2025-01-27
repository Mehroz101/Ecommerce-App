const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js")

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));


app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
