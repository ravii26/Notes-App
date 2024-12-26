import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "assets/notes.css";
import "assets/sidebar.css";
// import "assets/pagination.css";
import axios from "axios";
import AddNoteModal from "Modals/AddNoteModal";
import Header from "Components/Header";
import Sidebar from "Components/Sidebar";

function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [notesSave, setNotesSave] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Store the selected note ID for deletion

  const [showAddNoteModal, setShowAddNoteModal] = useState(false); // Control Add Note Modal visibility
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [variable, setVariable] = useState(false);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(6); // Adjust based on your design
  const notesPerPageOptions = [4, 6, 8, 10];

  const handleNoteClick = (title, discription, noteId) => {
    navigate(`/notes/${noteId}`);
  };

  const handleAddNote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createnote",
        {
          ...newNote,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hello");
      if (response.status === 201) {
        setNotes([...notes, response.data.note]);
        setNewNote({ title: "", description: "" });
        setShowAddNoteModal(false);
      }
    } catch (error) {
      console.log("Error adding note:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix} ${month} ${year}`;
  };

  const handleDelete = async () => {
    if (!selectedNoteId) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/deletenote",
        {
          noteId: selectedNoteId,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== selectedNoteId)
        );
        console.log("Note deleted successfully");
      }
      setSelectedNoteId(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }
      try {
        console.log(currentPage)
        const response = await axios.get(`http://localhost:5000/api/notes?page=${currentPage}&limit=${notesPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setNotes(response.data.notes || []);
        setTotalPages(response.data.totalPages || 1);
        setNotesSave(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 401) {
          alert("Invalid or expired token. Please login again.");
          navigate("/");
        }
      }
    };
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchNotes();
    fetchCategories();
  }, [navigate, variable, currentPage, notesPerPage]);

  const handleSearch = (e) => {
    setNotes(
      notesSave.filter((note) =>
        note.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value === "") {
      setVariable(!variable);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        {/* Navbar */}
        <Header />
        <Sidebar />

        {/* Notes Grid */}
        <div className="main-content">
          <div className="container ">
            <div className="d-flex justify-content-center">
              <div className="input-group" style={{ maxWidth: 300 }}>
                {/* <span className="input-group-text" id="basic-addon1">
                  <i className="bx bx-search" />
                </span> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="container mt-4">
            
            <div className="row g-4">
              {notes.length === 0 && (
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontStyle: "italic",
                    color: "gray",
                    fontSize: "25px",
                  }}
                >
                  No notes available
                </h1>
              )}
              {notes.map((note) => (
                <div className="col-md-4" key={note._id}>
                  <div
                    className="card note-card shadow-sm p-3 border-0"
                    onClick={() =>
                      handleNoteClick(note.title, note.description, note._id)
                    }
                  >
                    <h5 className="card-title">
                      {note.title} -- {note.categoy?.name}
                    </h5>
                    <p className="text-muted small">
                      {formatDate(note.createdAt)}
                    </p>
                    <p className="card-text description">{note.description}</p>
                    <button
                      className="btn btn-link delete-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click event from propagating to the card
                        setSelectedNoteId(note._id);
                      }}
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn add-cat-btn">
            <span className="plus-sign">
              <i className="bx bx-duplicate"></i>
            </span>
          </button>
          <button
            className="btn add-note-btn"
            onClick={() => setShowAddNoteModal(true)}
          >
            <span className="plus-sign">+</span>
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="pagination-container">
              <div className="results-dropdown mt-3">
                <span className="results-text"></span>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {notesPerPage} 
                  </button>
                  <ul className="dropdown-menu"> 
                    {/* <li><a className="dropdown-item" href="#">10</a></li>
                    <li><a className="dropdown-item" href="#">20</a></li>
                    <li><a className="dropdown-item" href="#">50</a></li>
                    <li><a className="dropdown-item" href="#">100</a></li> */}
                    {notesPerPageOptions.map((page) => (
                      <li key={page} className="dropdown-item"><button onClick={() =>{setCurrentPage(1); setNotesPerPage(page)}}>
                      {page}</button></li>
                    ))}
                  </ul>
                </div>
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item ">
                    <button className="page-link" onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1);}}>
                      <span>«</span>
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)} >{index+1 } </button></li>
                  ))}                 <li className="page-item">
                    <button className="page-link" onClick={() => { if (currentPage < totalPages) setCurrentPage(currentPage + 1);}}>
                      <span>»</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
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
                className="btn-m btn-cancel-m"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-m btn-delete-m"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddNoteModal
        show={showAddNoteModal}
        setShow={setShowAddNoteModal}
        newNote={newNote}
        setNewNote={setNewNote}
        handleAddNote={handleAddNote}
        categories={categories}
      />
    </>
  );
}

export default Home;
