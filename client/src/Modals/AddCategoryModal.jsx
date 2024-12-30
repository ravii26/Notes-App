import React from "react";
// import 'assets/createnote.css';

function AddCategoryModal({ showCategory, setShowCategory, newCategory, setNewCategory, handleAddCategory }) {
  
  return (
    <div
      className={`modal fade ${showCategory ? "show" : ""}`}
      id="addNoteModal"
      tabIndex="-1"
      aria-labelledby="addNoteModalLabel"
      aria-hidden={!showCategory}
      style={{ display: showCategory ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title modal-add " id="addNoteModalLabel">
              Add Category
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowCategory(false)} // Close the modal
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="noteTitle" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Enter category name"
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="noteDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="noteDescription"
                  rows="3"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  placeholder="Enter category description"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowCategory(false)} // Close the modal
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddCategory} // Call the add note function
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
