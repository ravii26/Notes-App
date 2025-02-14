// AddCategoryModal.js
import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { addCategory } from "services/apiServices";
import { updateCategory } from "services/apiServices";
import { checkToken } from "utils/CommonHelper";

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

  useEffect(() => {
    setNewCategory(initialData);
    setErrors({});
  }, [initialData, show]);

  const handleAddCategory = async () => {
    if(!checkToken()) {
      onClose();
      return;
    }
    try {
      if (categoryId) {
        const response = await updateCategory( newCategory.name, newCategory.description, categoryId);
        if (response.status === 200) {
          onSuccess(response.data.category);
          onClose();
          setNewCategory({ name: "", description: "" });
        }
      } else {
        const response = await addCategory(newCategory)
        if (response.status === 201) {
          if (onSuccess) onSuccess(response.data.category);
          onClose();
          setNewCategory({ name: "", description: "" });
        }
      }
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

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
