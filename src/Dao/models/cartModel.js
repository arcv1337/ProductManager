import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Product from "./productModel.js";

const cartCollection = "carts";

const cartSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;