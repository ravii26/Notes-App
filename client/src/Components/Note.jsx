import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getNote } from "services/apiServices";
import { updateNote } from "services/apiServices";

function Note() {
  const [note, setNote] = useState({ title: "", description: "" });
  const [timer, setTimer] = useState(null);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [change, setChange] = useState(false);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const socket = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    const fetchNote = async () => {
      try {
        const response = await getNote({ noteId });
        if (response.status === 201) {
          setNote(response.data.note);
        }
      } catch (error) {
        console.log("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [navigate, noteId]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("userInfo", {
      userId:  localStorage.getItem("token"),
    });

    socket.current.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.current.on("receiveMessage", (data) => {
      if (data.noteId !== noteId) return;
      setNote(data.message);
    });

    socket.current.emit("sendMessageToList", {
      userId: localStorage.getItem("token"),message: note, noteId: noteId
    });

    socket.current.on("onConnect", (data) => {
      console.log("Socket id:", data.id);
    });
  }, [change]);

  const handleChange = (field, value, ref) => {
    const cursorPosition = getCaretPosition(ref.current);

    setNote((prevNote) => ({
      ...prevNote,
      [field]: value,
    }));

    setChange(!change);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      console.log("Autosaving note...");
      saveNote();
    }, 2000);

    setTimer(newTimer);

    setTimeout(() => {
      setCaretPosition(ref.current, cursorPosition);
    }, 0);
  };

  const saveNote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const response = await updateNote(noteId, { title: note.title, description: note.description });
      if (response.status === 200) {
        console.log("Note autosaved", response.data);

        socket.current.emit("noteUpdated", response.data.note);
      } else {
        console.log("Failed to save note:", response.status);
      }
    } catch (error) {
      console.log("Error saving note:", error);
    }
  };

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

  const setCaretPosition = (el, pos) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (!el.firstChild) el.textContent = "";
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
