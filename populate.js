const { config } = require("dotenv");
const { connectToDb } = require("./Database/data-base");
config();
const { products } = require("./products");
const Products = require("./Models/product");
console.log(products);
const startPopulate = async (url) => {
  try {
    await connectToDb(url);
    await Products.deleteMany();
    await Products.create(products);

    console.log("Populate DB Started");
    process.exit(0);
  } catch (error) {
    console.log("There is an error");
    process.exit(1);
  }
};
startPopulate(process.env.MONGO_URL);
