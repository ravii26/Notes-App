import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) =>
      console.error("Error converting file to Base64:", error);
    reader.readAsDataURL(file);
  };

  const [variantsGroups, setVariantsGroups] = useState([
    {
      groupName: "",
      variants: [{ name: "", price: "" }],
    },
  ]);

  const addVariantGroup = () => {
    setVariantsGroups([
      ...variantsGroups,
      { groupName: "", variants: [{ name: "", price: "" }] },
    ]);
  };

  const removeVariantGroup = (index) => {
    setVariantsGroups(variantsGroups.filter((_, i) => i !== index));
  };

  const updateGroupName = (index, name) => {
    const updatedGroups = [...variantsGroups];
    updatedGroups[index].groupName = name;
    setVariantsGroups(updatedGroups);
  };

  const addVariant = (groupIndex) => {
    const updatedGroups = [...variantsGroups];
    updatedGroups[groupIndex].variants.push({ name: "", price: "" });
    setVariantsGroups(updatedGroups);
  };

  const removeVariant = (groupIndex, variantIndex) => {
    const updatedGroups = [...variantsGroups];
    updatedGroups[groupIndex].variants = updatedGroups[
      groupIndex
    ].variants.filter((_, i) => i !== variantIndex);
    setVariantsGroups(updatedGroups);
  };

  const updateVariant = (groupIndex, variantIndex, field, value) => {
    const updatedGroups = [...variantsGroups];
    updatedGroups[groupIndex].variants[variantIndex][field] = value;
    setVariantsGroups(updatedGroups);
  };

  const [ingredients, setIngredients] = useState([
    {
      image: "",
      name: "",
      amount: "",
      quantity: "",
      description: "",
    },
  ]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { image: "", name: "", amount: "", quantity: "", description: "" },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleLogoChange = (index, file) => {
    fileToBase64(file, (base64) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index].image = base64.slice(22);
      setIngredients(updatedIngredients);
    });
  };

  const handleImageChange = (file) => {
    fileToBase64(file, (base64) => {
      setImage(base64.slice(22));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      let data = {};
      data.name = name;
      data.description = description;
      data.price = price;
      data.ingredients = ingredients;
      data.variantsGroups = variantsGroups;
      data.image = image;
      console.log(data);
      if (window.location.href.split("?").pop().startsWith("id")) {
        console.log("Edit product");
        const id = window.location.href.split("?").pop().slice(3);
        const response = await axios.put(
          `http://localhost:5000/api/v1/update-product/${id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Product updated successfully");
          navigate("/products");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/v1/create-product",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          navigate("/products");
        }
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    if (window.location.href.split("?").pop().startsWith("id")) {
      console.log("Edit product");
      const id = window.location.href.split("?").pop().slice(3);
      try {
        const response = axios.get(
          `http://localhost:5000/api/v1/get-product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        response.then((response) => {
          const product = response.data.product;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setImage(product.image);
          setIngredients(product.ingredients);
          setVariantsGroups(product.variantsGroup);
        });
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  }, [navigate]);

  return (
    <div>
      <div className="container my-5 body-add-product">
        <h1 className="mb-4">Edit Projects</h1>
        <div className="row">
          {/* Left Form Section */}
          <div className="col-lg-7">
            <form>
              <div className="row mb-3">
                <div className="col-md-8">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-8">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
              </div>
            </form>
          </div>
          {/* Right Image Section */}
          <div className="col-lg-4">
            <p>Logo</p>
            <div className="row g-3">
              <div className="col-md-12 text-center">
                <label htmlFor="image1">
                  <img
                    style={{
                      cursor: "pointer",
                      height: "250px",
                      width: "400px",
                      objectFit: "contain",
                    }}
                    src={
                      image
                        ? `data:image/png;base64,${image}`
                        : "https://placehold.co/400x250"
                    }
                    alt="Click to upload"
                    className="img-thumbnail"
                  />
                  <input
                    type="file"
                    id="image1"
                    className="d-none"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/*Variant Groups*/}
        <div className="container my-5">
          <h2 className="mt-5">
            Variant Groups
            <button
              type="button"
              className="btn btn-primary ms-3"
              onClick={addVariantGroup}
            >
              <i className="bx bx-plus" />
            </button>
          </h2>
          {variantsGroups.map((group, groupIndex) => (
            <div className="row mb-3" key={groupIndex}>
              <div className="col-lg-12">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter variant group name"
                          value={group.groupName}
                          onChange={(e) =>
                            updateGroupName(groupIndex, e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => removeVariantGroup(groupIndex)}
                        >
                          <i className="bx bxs-trash" />
                        </button>
                      </div>
                    </div>
                    <div className="variantGroupContainer">
                      <table
                        className="table"
                        style={{ borderBottom: "1px solid white" }}
                      >
                        <thead style={{ borderBottom: "1px solid #ccc" }}>
                          <tr>
                            <th>Variant</th>
                            <th>Price</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {group.variants.map((variant, variantIndex) => (
                            <tr key={variantIndex}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter variant"
                                  value={variant.name}
                                  onChange={(e) =>
                                    updateVariant(
                                      groupIndex,
                                      variantIndex,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter price"
                                  value={variant.price}
                                  onChange={(e) =>
                                    updateVariant(
                                      groupIndex,
                                      variantIndex,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm mx-2"
                                  onClick={() =>
                                    removeVariant(groupIndex, variantIndex)
                                  }
                                >
                                  <i className="bx bxs-trash" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="3">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => addVariant(groupIndex)}
                              >
                                <i className="bx bx-plus" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Add Ingredient */}
        <div className="container my-5">
          <h2>
            Add Ingredient{" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddIngredient}
            >
              <i className="bx bx-plus" />
            </button>
          </h2>
          <div className="ingredientContainer">
            {ingredients.map((ingredient, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-danger mx-2 btn-sm rounded-circle "
                    style={{ height: "20px", width: "20px", padding: "0" }}
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    <i className="bx bx-x" />
                  </button>
                  <label htmlFor={`logo-${index}`}>Logo</label>
                  <div className="text-center">
                    <label htmlFor={`logoUpload-${index}`}>
                      <img
                        src={
                          ingredient.image
                            ? `data:image/png;base64,${ingredient.image}`
                            : "https://placehold.co/250x150"
                        }
                        alt="Click to upload"
                        className="img-thumbnail indgredientLogo"
                      />
                      <input
                        type="file"
                        id={`logoUpload-${index}`}
                        className="d-none"
                        accept="image/*"
                        onChange={(e) =>
                          handleLogoChange(index, e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor={`name-${index}`} className="required">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`name-${index}`}
                    placeholder="Name"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  <label htmlFor={`amount-${index}`} className="required">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`amount-${index}`}
                    placeholder="Amount"
                    value={ingredient.amount}
                    onChange={(e) =>
                      handleInputChange(index, "amount", e.target.value)
                    }
                  />
                  <label htmlFor={`qty-${index}`} className="required">
                    Qty
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`qty-${index}`}
                    placeholder="Qty"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor={`description-${index}`} className="required">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id={`description-${index}`}
                    rows={3}
                    placeholder="Description"
                    value={ingredient.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="btn btn-primary btn-sm mx-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button type="button" className="btn btn-secondary">
            <a href="/products" style={{ color: "white", textDecoration: "none" }}>
              Cancel
              </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
