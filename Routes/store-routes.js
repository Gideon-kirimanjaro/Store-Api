const express = require("express");
const router = express.Router();
const {
  getProducts,
  postProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getStaticProducts,
  searchProductsParams,
} = require("../Controllers/store-controllers");

router.route("/products").get(getStaticProducts).post(postProducts);
router.route("/search").get(searchProductsParams);
router.route("/:key").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = { router };
