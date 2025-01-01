import React from "react";

function AddNoteModal({ show, setShow, newNote, setNewNote, handleAddNote, categories }) {
  
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
              onClick={() => setShow(false)} // Close the modal
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
                <label htmlFor="noteTitle" className="form-label">
                  Category
                </label>
                <select name="" id="" className="form-control" value={newNote.category} onChange={(e) => setNewNote({ ...newNote, category : e.target.value })}>
                  <option disabled hidden value="" defaultValue="No">Select Category</option>
        
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer modal-footer-custom">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShow(false)} // Close the modal
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddNote} // Call the add note function
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
