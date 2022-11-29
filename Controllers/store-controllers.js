require("express-async-errors");
const { query } = require("express");
const Products = require("../Models/product");
const getStaticProducts = async (req, res) => {
  const products = await Products.find({});

  res.status(200).send(products);
};
const searchProductsParams = async (req, res) => {
  const {
    company,
    price,
    featured,
    name,
    sort,
    fields,
    page,
    limit,
    numericFilters,
  } = req.query;
  //   const queryObj = {};
  //   const products = await Products.find(queryObj);
  //   if (company) {
  //     queryObj.company = company;
  //   }
  //   if (price) {
  //     queryObj.price = price;
  //   }
  //   if (featured) {
  //     queryObj.featured = featured === "true" ? true : false;
  //   }
  //   if (name) {
  //     queryObj.name = { $regex: name, $options: "i" };
  //   }
  //----------------------------------------Sort
  //   const products =  Products.find(queryObj);
  //Limit
  //   const limitProducts = await Products.find({}).limit(4);

  // if (sort) {
  //   const sortList = sort.split(",").join(" ");
  //   const sortedProducts = await products.sort(sortList);
  //   res.send(sortedProducts);
  // }
  //---------------------------------------------------------SELECT FIELDS
  //   if (fields) {
  //     const selectField = fields.split(",").join(" ");
  //     const fieldProducts = await products.select(selectField);
  //     res.send(fieldProducts);
  //   }
  //-----------------------------------------------------------------------LIMIT
  //   res.send(limitProducts);
  //----------------------------------------------------------------------------------Pagination
  //   const Page = Number(page) || 1;
  //   const pageLimit = Number(limit) || 10;
  //   const step = (page - 1) * limit;
  //   const products = await Products.find({}).skip(step).limit(pageLimit);
  //   res.status(200).json(products);
  //----------------------------------------------------------------------------------QUERY OPERATORS

  //   const paramsObj = {};
  //   if (company) {
  //     paramsObj.company = company;
  //   }
  //   if (price) {
  //     paramsObj.price = { $gt: price };
  //   }
  //   const products = await Products.find(paramsObj);
  //   res.status(200).send(products);
  //----------------------------------------------------------------------------------NUMERIC FILTERS
  const queryObject = {};
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    const products = await Products.find(queryObject);
    res.send(products);
  }
};
const getProduct = (req, res) => {
  res.send("Get One Product");
};
const postProducts = (req, res, next) => {
  if (!req.body) {
    throw Error("Product does not exist");
  }
  res.send("Post a product");
};
const deleteProduct = (req, res) => {
  res.send("Delete a product");
};
const updateProduct = (req, res) => {
  res.send("Update  a product");
};
module.exports = {
  updateProduct,
  deleteProduct,
  getProduct,
  getStaticProducts,
  postProducts,
  searchProductsParams,
};
