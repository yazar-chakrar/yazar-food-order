// database related modules
module.exports = {
  databaseConnection: require("./connection"),
  CustomerController: require("./controllers/customer-controller"),
  ProductController: require("./controllers/product-controller"),
  ShoppingController: require("./controllers/shopping-controller"),
};
