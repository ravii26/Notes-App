import Category from "../models/category.js";

const getCategories = async (req, res) => {
  try {
    const user = req.user;
    const categories = await Category.find({ user: user._id });

    if (!categories)
      return res.status(404).send({ message: "Categories not found" });

    res.status(200).send({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const createCategory = async (req, res) => {
  try {
    const user = req.user;

    const { name, description } = req.body;
    const category = new Category({ name, description, user: user._id });
    await category.save();

    res
      .status(201)
      .send({ message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;

    const category = await Category.findOneAndDelete({ _id: categoryId });
    if (!category)
      return res.status(404).send({ message: "Category not found" });

    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { getCategories, createCategory, deleteCategory };
