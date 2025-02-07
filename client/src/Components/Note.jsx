
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

function Note() {
  const [note, setNote] = useState({ title: "", description: "" });
  const { noteId } = useParams();
  const navigate = useNavigate();
  const descriptionRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
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
        const response = await axios.post(
          "http://localhost:5000/api/v1/get-note",
          { noteId },
          { headers: { Authorization: `Bearer ${token}` } }
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

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("userInfo", {
      userId: localStorage.getItem("token"),
    });

    socket.current.on("receiveMessage", (data) => {
      if (data.noteId !== noteId) return;
      setNote(data.message);
    });
  }, []);

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
          description: descriptionRef.current.innerHTML,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("Note autosaved", response.data);
        socket.current.emit("noteUpdated", response.data.note);
      }
    } catch (error) {
      console.log("Error saving note:", error);
    }
  };

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
    saveNote();
  };

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { url, type } = response.data;

      if (type.startsWith("image/")) {
        document.execCommand("insertImage", false, url);
      } else {
        const fileLink = `<a href="${url}" target="_blank">${file.name}</a>`;
        document.execCommand("insertHTML", false, fileLink);
      }

      saveNote();
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const toggleDrawing = () => {
    setDrawing(!drawing);
  };

  useEffect(() => {
    if (drawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctxRef.current = ctx;
    }
  }, [drawing]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const drawingURL = canvas.toDataURL("image/png");
    document.execCommand("insertImage", false, drawingURL);
    setDrawing(false);
    saveNote();
  };

  return (
    <div>
      <div className="main-content">
        <h5
          className="heading-note"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={saveNote}
          dangerouslySetInnerHTML={{ __html: note?.title }}
        ></h5>

        <p
          className="description-note"
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={descriptionRef}
          onBlur={saveNote}
          dangerouslySetInnerHTML={{ __html: note?.description }}
        ></p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => applyFormat("bold")}><b>B</b></button>
        <button onClick={() => applyFormat("underline")}><u>U</u></button>
        <button onClick={() => applyFormat("insertUnorderedList")}><i class='bx bx-list-ul'></i></button>
        <button onClick={() => document.execCommand("insertHTML", false, '<input type="checkbox"> ')}>☑</button>
        <button onClick={() => fileInputRef.current.click()}>📄</button>
        <button onClick={toggleDrawing}><i class='bx bx-pencil' ></i></button>
        <input type="file" ref={fileInputRef} onChange={uploadFile} hidden />
      </div>

      {/* Drawing Canvas */}
      {drawing && (
        <div className="drawing-container">
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          ></canvas>
          <button onClick={saveDrawing}>✔ Save Drawing</button>
          <button onClick={toggleDrawing}>❌ Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Note;

