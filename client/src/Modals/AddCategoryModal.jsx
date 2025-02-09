// AddCategoryModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function AddCategoryModal({
  show,
  onClose,
  categoryId = "",
  initialData = { name: "", description: "" },
  onSuccess,
}) {
  const [newCategory, setNewCategory] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [color, setColor] = useColor("#561ecb");

  // Update local form state if initialData or show changes.
  useEffect(() => {
    setNewCategory(initialData);
    setErrors({});
  }, [initialData, show]);

  // Performs the API call to create or update the category.
  const handleAddCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      onClose();
      return;
    }
    try {
      if (categoryId) {
        // Update existing category
        const response = await axios.post(
          "http://localhost:5000/api/v1/update-category",
          {
            name: newCategory.name,
            description: newCategory.description,
            categoryId: categoryId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          onSuccess(response.data.category);
          onClose();
          setNewCategory({ name: "", description: "" });
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/v1/create-category",
          newCategory,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 201) {
          // Pass the new category back to the parent.
          if (onSuccess) onSuccess(response.data.category);
          onClose();
          setNewCategory({ name: "", description: "" });
        }
      }
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  // Validate form and then call the API.
  const handleSave = () => {
    let newErrors = {};
    if (!newCategory.name.trim()) newErrors.name = "Name is required.";
    if (!newCategory.description.trim())
      newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleAddCategory();
  };

  const handleClose = () => {
    setNewCategory(initialData);
    setErrors({});
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-add">
              {categoryId ? "Edit Category" : "Add Category"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body modal-body-custom">
            <div className="mb-3 text-start">
              <label htmlFor="categoryName" className="form-label">
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="Enter category name"
              />
              {errors.name && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.name}
                </div>
              )}
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="categoryDescription" className="form-label">
                Description<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                className="form-control"
                id="categoryDescription"
                rows="3"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                placeholder="Enter category description"
              ></textarea>
              {errors.description && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.description}
                </div>
              )}
            </div>
          </div>
          <div>
            <div
              height="100px"
              width="100px"
              style={{ backgroundColor: color.hex }}
            >
              <span style={{ color: "white" }}>Selected Color</span>
            </div>
            <br />
            <ColorPicker
              color={color}
              onChange={setColor}
              onChangeComplete={setColor}
              width={300}
              height={130}
            />
          </div>
          <div className="modal-footer modal-footer-custom">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
