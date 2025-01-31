import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddNoteModal from "Modals/AddNoteModal";
import DeleteModal from "Modals/DeleteModal";
import Pagination from "Helper/Pagination";
import { onMessageListener } from "utils/firebaseUtils";
import { ToastContainer, toast } from "react-toastify";
import { formatDate } from "utils/CommonHelper";
import { addNote } from "services/apiServices";

function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [notesSave, setNotesSave] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [variable, setVariable] = useState(false);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(6);
  const notesPerPageOptions = [4, 6, 8, 10];

  const handleNoteClick = (noteId) => {
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
      const note = await addNote(newNote);
      if (note) {
        setNotes([...notes, note]);
        setNewNote({ title: "", description: "", category: "" });
        setShowAddNoteModal(false);
      }
    } catch (error) {
      console.log("Error adding note:", error);
    }
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
      const response = await axios.delete(
        `http://localhost:5000/api/v1/delete-note/${selectedNoteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== selectedNoteId)
        );
        setVariable(!variable);
      }
      setSelectedNoteId(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // const fetchFCMToken = async () => {
  //   const fcmtoken = await requestFCMToken();
  // };

  onMessageListener()
    .then((payload) => {
      console.log("Started");
      if (payload) {
        console.log(payload);
        toast(
          <div>
            <p>{payload.notification.title}</p>
            <p>{payload.notification.body}</p>
          </div>,
          { position: "top-right", autoClose: 3000 }
        );
      }
    })
    .catch((err) => console.log("failed", err));

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/get-notes?page=${currentPage}&limit=${notesPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotes(response.data.notes || []);
        setTotalPages(response.data.totalPages || 1);
        setNotesSave(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
        localStorage.removeItem("token");
        if (error.response?.status === 401) {
          alert("Invalid or expired token. Please login again.");
          navigate("/");
        }
      }
    };
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/get-categories",
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
    // fetchFCMToken();
  }, [navigate, variable, currentPage, notesPerPage]);

  const handleSearch = async (e) => {
    if (e.target.value === "") {
      setVariable(!variable);
    }
    // else {
    //   let searchText = e.target.value;
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.post(
    //       "http://localhost:5000/api/v1/search-notes",
    //       {
    //         searchText,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     if (response.status === 200) {
    //       setNotes(response.data.notes);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching notes:", error);
    //   }
    // }
    setNotes(
      notesSave.filter((note) =>
        note.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="body-home">
      <div>
        <ToastContainer />

        <div className="main-content">
          <div className=" ">
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
                      handleNoteClick(note._id)
                    }
                  >
                    <h5 className="card-title">
                    {note.title}{" "}
                    {note.category && (
                      <p className="category">
                      
                        <span>{note.category?.name}</span>
                        </p> 
                      )}
                     
                    </h5>
                    <p className="card-text description">{note.description}</p>
                    <p className="text-muted mb-0 small">
                      {formatDate(note.createdAt)}
                    </p>
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
          <button
            className="btn add-note-btn"
            onClick={() => setShowAddNoteModal(true)}
          >
            <span className="plus-sign">+</span>
          </button>
        </div>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        notesPerPage={notesPerPage}
        setNotesPerPage={setNotesPerPage}
        notesPerPageOptions={notesPerPageOptions}
        handlePageChange={handlePageChange}
      />

      <DeleteModal handleDelete={handleDelete} />

      <AddNoteModal
        show={showAddNoteModal}
        setShow={setShowAddNoteModal}
        newNote={newNote}
        setNewNote={setNewNote}
        handleAddNote={handleAddNote}
        categories={categories}
      />
    </div>
  );
}

export default Home;
