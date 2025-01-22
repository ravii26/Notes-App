import mongoose from "mongoose";
import Ingredient from "./ingredient.js";
import VariantGroup from "./variant.js";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  ingredients: [Ingredient.schema],
  variantsGroup: [VariantGroup.schema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Product = mongoose.model("product", productSchema);

export default Product;