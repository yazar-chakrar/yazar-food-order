const mongoose = require("mongoose");

const AdressSchema = new mongoose.Schema({
  street: String,
  postalCode: String,
  city: String,
  country: String,
});

module.exports = mongoose.model("adress", AdressSchema);
