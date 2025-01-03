import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const vatriantGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    variants: [variantSchema],
})

const VariantGroup = mongoose.model("variantGroup", vatriantGroupSchema);

export default VariantGroup;