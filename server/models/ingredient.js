import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    image : { type: String },
})

const Ingredient = mongoose.model("ingedient", ingredientsSchema);

export default Ingredient;