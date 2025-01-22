import React from "react";

function Pagination(props) {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    notesPerPage,
    setNotesPerPage,
    notesPerPageOptions,
    handlePageChange,
  } = props;
  return (
    <div className="body-pagination">
      <div className="container ">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="pagination-container">
              <div className="results-dropdown mt-3">
                <span className="results-text"></span>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {notesPerPage}
                  </button>
                  <ul className="dropdown-menu">
                    {notesPerPageOptions.map((page) => (
                      <li key={page} className="dropdown-item">
                        <button
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px",
                            border: "2px solid #ccc ",
                            borderRadius: "5px",
                            backgroundColor: "transparent",
                            color: "inherit",
                            fontSize: "14px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setCurrentPage(1);
                            setNotesPerPage(page);
                          }}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination pagination-custom justify-content-center">
                  <li className="page-item page-item-custom">
                    <button
                      className="page-link page-link-custom"
                      onClick={() => {
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                    >
                      <span>«</span>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item page-item-custom ${
                        index + 1 === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link page-link-custom"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}{" "}
                      </button>
                    </li>
                  ))}{" "}
                  <li className="page-item page-item-custom">
                    <button
                      className="page-link page-link-custom"
                      onClick={() => {
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                    >
                      <span>»</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
