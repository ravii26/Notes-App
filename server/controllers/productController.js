import Product from "../models/product.js";
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    if (!name || !price || !description || !image)
      return res
        .status(400)
        .json({ message: "Please provide a name and price for the product" });
    const user = req.body.user._id;
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please provide a user for the product" });
    }
    const product = new Product({ name, description, price, image, user: user });
    if (req.body.ingredients) {
      product.ingredients.push(...req.body.ingredients);
    } else {
      return res
        .status(400)
        .json({ message: "Please provide ingredients for the product" });
    }

    product.variantsGroup.push(...req.body.variantsGroups);
    await product.save();

    res.status(200).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const user = req.params.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    let products;
    if (user.isAdmin) {
      products = await Product.find({});
    } else {
      products = await Product.find({ user: user._id });
    }
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Error getting products" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Error getting product" });
  }
};

const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, image } = req.body;
    if (!name || !price || !description || !image)
      return res
        .status(400)
        .json({ message: "Please provide a name and price for the product" });
    const user = req.body.user;
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please provide a user for the product" });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.ingredients = [];
    product.variantsGroup = [];
    if (req.body.ingredients) {
      product.ingredients.push(...req.body.ingredients);
    } else {
      return res
        .status(400)
        .json({ message: "Please provide ingredients for the product" });
    }

    product.variantsGroup.push(...req.body.variantsGroups);
    await product.save();
    
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
