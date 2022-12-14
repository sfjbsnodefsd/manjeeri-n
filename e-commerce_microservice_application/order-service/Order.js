const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: [{ product_id: String }],
  user: String,
  total_price: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order
