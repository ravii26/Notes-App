import React, { useState } from "react";
import { addCategory } from "services/apiServices";
import AddCategoryModal from "./AddCategoryModal";

function AddNoteModal({ show, setShow, newNote, setNewNote, handleAddNote, categories }) {
  const [errors, setErrors] = useState({ title: "", description: "", category: "" });
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false); // Add Category Modal State

  const handleSave = () => {
    const newErrors = {};
    if (!newNote.title.trim()) newErrors.title = "Title is required.";
    if (!newNote.description.trim()) newErrors.description = "Description is required.";
    if (!newNote.category) newErrors.category = "Category is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleAddNote();
      closeModal();
    }
  };

  const closeModal = () => {
    setNewNote({ title: "", description: "", category: "" });
    setShow(false);
    setErrors({ title: "", description: "", category: "" });
  };

  return (
    <>
      {/* Main Add Note Modal */}
      
    <div
      className={`modal fade ${show ? "show" : ""}`}
      id="addNoteModal"
      tabIndex="-1"
      aria-labelledby="addNoteModalLabel"
      aria-hidden={!show}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-add " id="addNoteModalLabel">
              Add Note
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal} 
            ></button>
          </div>
          <div className="modal-body modal-body-custom">
            <form>
              {/* Title Field */}
              <div className="mb-3 text-start">
                <label htmlFor="noteTitle" className="form-label">
                  Title<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  placeholder="Enter note title"
                />
                {errors.title && (
                  <div style={{ color: "red", marginTop: "5px" }}>{errors.title}</div>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-3 text-start">
                <label htmlFor="noteDescription" className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  id="noteDescription"
                  rows="3"
                  value={newNote.description}
                  onChange={(e) =>
                    setNewNote({ ...newNote, description: e.target.value })
                  }
                  placeholder="Enter note description"
                ></textarea>
                {errors.description && (
                  <div style={{ color: "red", marginTop: "5px" }}>{errors.description}</div>
                )}
              </div>

              {/* Category Field */}
              <div className="mb-3 text-start">
                <label htmlFor="noteCategory" className="form-label">
                  Category<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="noteCategory"
                  className="form-control"
                  value={newNote.category}
                  onChange={(e) =>
                    setNewNote({ ...newNote, category: e.target.value })
                  }
                >
                  <option disabled hidden value="">
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div style={{ color: "red", marginTop: "5px" }}>{errors.category}</div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer modal-footer-custom">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal} 
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave} 
            >
              Save Note
            </button>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <AddCategoryModal
          show={showAddCategoryModal}
          setShow={setShowAddCategoryModal}
        />
      )}
    </>
  );
}

export default AddNoteModal;
