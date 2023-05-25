import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);


export default productModel;