import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // color: {
  //   type: String,
  //   default: "#000000",
  // },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
