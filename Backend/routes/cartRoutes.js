
const express = require("express");
const cartController = require("../controllers/CartController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/addtocart", authMiddleware, cartController.addToCart);
router.post("/removefromcart", authMiddleware, cartController.removeFromCart);
router.get("/getcartproduct", authMiddleware, cartController.getCart);

module.exports = router;