const Product = require("../models/Product");


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.addProduct = async (req, res) => {
  try {
    console.log("entered")
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
