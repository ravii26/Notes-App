import React, { useState } from "react";

function AddCategoryModal({ showCategory, setShowCategory, newCategory, setNewCategory, handleAddCategory }) {
  const [errors, setErrors] = useState({ name: "", description: "" });

  const handleSave = () => {
    const newErrors = {};
    if (!newCategory.name.trim()) newErrors.name = "Name is required.";
    if (!newCategory.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleAddCategory();
      closeModal();
    }
  };

  const closeModal = () => {
    setNewCategory({ name: "", description: "" });
    setShowCategory(false);
    setErrors({ name: "", description: "" });
  };

  return (
    <div
      className={`modal fade ${showCategory ? "show" : ""}`}
      id="addCategoryModal"
      tabIndex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden={!showCategory}
      style={{ display: showCategory ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-add " id="addCategoryModalLabel">
              Add Category
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal} // Close the modal
            ></button>
          </div>
          <div className="modal-body modal-body-custom">
            <form>
              {/* Name Field */}
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
                  <div style={{ color: "red", marginTop: "5px" }}>{errors.name}</div>
                )}
              </div>

              {/* Description Field */}
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
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  placeholder="Enter category description"
                ></textarea>
                {errors.description && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.description}
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer modal-footer-custom">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal} // Close the modal
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave} // Call the save function with validation
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
