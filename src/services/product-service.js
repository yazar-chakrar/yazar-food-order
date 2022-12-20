const { ProductController } = require("../database");
const { APIError } = require("../utils/app-errors");

class ProductService {
  constructor() {
    this.controller = new ProductController();
  }

  async CreateProduct(userInput) {
    const { name, desc, type, unit, price, available, suplier, banner } =
      userInput;

    try {
      const productResult = await this.controller.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });
      return productResult;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProducts() {
    try {
      const products = this.controller.Products();
      return products;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProductById(productId) {
    try {
      const productResult = this.controller.FindById(productId);
      return productResult;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProductsByCategory(productCategory) {
    try {
      const products = this.controller.FindByCategory(productCategory);
      return products;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetSelectedProducts(selectedIds) {
    try {
      const products = this.controller.FindSelectedProducts(selectedIds);
      return products;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = ProductService;
