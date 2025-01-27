const express = require("express");
const productController = require("../controllers/ProductController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/getproducts", productController.getProducts);
router.post("/addproduct", AuthMiddleware, productController.addProduct);

module.exports = router;
