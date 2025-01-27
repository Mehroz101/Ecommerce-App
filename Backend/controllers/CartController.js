const Cart = require("../models/Cart");


exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
console.log(productId)
console.log(quantity)
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({success:true, message:"product added to cart"});
  } catch (err) {
    res.status(400).json({ success:false, message:err.message });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const {id } = req.body; 
    const userId = req.user.userId; 

    
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    
    cart.products = cart.products.filter(
      (item) => item._id.toString() !== id
    );

    
    await cart.save();

    res.json({ success: true, message: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate(
      "products.productId"
    );
    res.json({success:true, data:cart});
  } catch (err) {
    res.status(500).json({success:true, message: err.message });
  }
};