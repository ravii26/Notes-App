import React from "react";
import "assets/deletemodal.css"

function DeleteModal({ selectedNoteId, handleDelete }) {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">Delete Note</h5>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this note?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-delete"
              data-bs-dismiss="modal"
              onClick={handleDelete} // Trigger handleDelete on confirmation
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
