const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const productsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product Name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{value} is not a company in our list",
    },
  },
});
module.exports = model("Products", productsSchema);
