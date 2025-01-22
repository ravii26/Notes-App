import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Note() {
  const [note, setNote] = useState({ title: "", description: "" });
  const [timer, setTimer] = useState(null); // Timer for delay before autosave
  const { noteId } = useParams();
  const navigate = useNavigate();

  // Refs for title and description contentEditable elements
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    const fetchNote = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/get-note",
          {
            noteId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          setNote(response.data.note);
        }
      } catch (error) {
        console.log("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [navigate, noteId]);

  // Function to handle content changes and set autosave timer
  const handleChange = (field, value, ref) => {
    const cursorPosition = getCaretPosition(ref.current); // Save current cursor position

    setNote((prevNote) => ({
      ...prevNote,
      [field]: value,
    }));

    // Clear the previous timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer to autosave after 2 seconds
    const newTimer = setTimeout(() => {
      console.log("Autosaving note...");
      saveNote();
    }, 2000);

    setTimer(newTimer);

    // Restore the cursor position after state update
    setTimeout(() => {
      setCaretPosition(ref.current, cursorPosition); // Restore cursor position
    }, 0);
  };

  // Function to save the note to the backend
  const saveNote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/update-note/${noteId}`,
        {
          title: note.title,
          description: note.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("Note autosaved", response.data); // Debug log
      } else {
        console.log("Failed to save note:", response.status); // Debug log
      }
    } catch (error) {
      console.log("Error saving note:", error); // Debug log
    }
  };

  // Function to get the caret position inside a contentEditable element
  const getCaretPosition = (el) => {
    let caretPos = 0;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(el);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretPos = preCaretRange.toString().length;
    return caretPos;
  };

  // Function to set the caret position inside a contentEditable element
  const setCaretPosition = (el, pos) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (!el.firstChild) el.textContent = ""; // Ensure text node exists
    range.setStart(el.firstChild, pos);
    range.setEnd(el.firstChild, pos);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div>
      <div className="main-content">
        <h5
          className="heading-note"
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={titleRef}
          onInput={(e) =>
            handleChange("title", e.currentTarget.textContent, titleRef)
          }
          onBlur={saveNote}
        >
          {note?.title}
        </h5>

        <p
          className="description-note"
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={descriptionRef}
          onInput={(e) =>
            handleChange("description", e.target.innerText, descriptionRef)
          }
          onBlur={saveNote}
        >
          {note?.description}
        </p>
      </div>
    </div>
  );
}

export default Note;
