import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  image: String,
  description: String,
  inStock: { type: Boolean, default: true },
});

export default mongoose.model("Product", productSchema);
