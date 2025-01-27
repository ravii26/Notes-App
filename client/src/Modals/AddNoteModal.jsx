import React, { useState } from "react";

function AddNoteModal({ show, setShow, newNote, setNewNote, handleAddNote, categories }) {
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!newNote.category) {
      setError("Category is required.");
    } else {
      setError("");
      handleAddNote();
    }
  };

  const closeModal = () => {
    setNewNote({title:"", description:"", category:""})
    setShow(false)
    setError("")
  }

  return (
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
              onClick={closeModal} // Close the modal
            ></button>
          </div>
          <div className="modal-body modal-body-custom">
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="noteTitle" className="form-label">
                  Title
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
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="noteDescription" className="form-label">
                  Description
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
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="noteCategory" className="form-label">
                  Category <span style={{ color: "red" }}>*</span>
                </label>
                <select name="" id="" className="form-control" value={newNote.category} onChange={(e) => setNewNote({ ...newNote, category : e.target.value })}>
                  <option disabled hidden value="" defaultValue="No">Select Category</option>
        
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {error && (
                  <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
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
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNoteModal;
