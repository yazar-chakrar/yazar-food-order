const { ShoppingController } = require("../database");
const { APIError } = require("../utils/app-errors");

class ShoppingService {
  constructor() {
    this.controller = new ShoppingController();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    try {
      const orderResult = await this.controller.CreateNewOrder(_id, txnNumber);
      return orderResult;
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = this.controller.Orders(customerId);
      return orders;
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }
}

module.exports = ShoppingService;
