const { CustomerController } = require("../database");
const {
  ValidatePassword,
  GenerateSignature,
  GenerateSalt,
  GeneratePassword,
} = require("../utils");
class CustomerService {
  constructor() {
    this.controller = new CustomerController();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existCustomer = this.controller.FindCustomer({ email });
      if (existCustomer) {
        const validPassword = ValidatePassword(
          password,
          existCustomer.password,
          existCustomer.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existCustomer.email,
            _id: existCustomer._id,
          });
          return { id: existCustomer._id, token };
        }
      }
      return null;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;

    try {
      const existCustomer = this.controller.FindCustomer({ email });

      if (!existCustomer) {
        let salt = await GenerateSalt();
        let userPassword = GeneratePassword(password, salt);

        const newCustomer = await this.controller.CreateCustomer({
          email,
          password: userPassword,
          phone,
          salt,
        });

        const token = await GenerateSignature({
          email: email,
          _id: newCustomer._id,
        });

        return {
          id: newCustomer._id,
          token,
        };
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = CustomerService;
