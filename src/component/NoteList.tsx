"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNote from "./AddNote";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.notes);
  const [editNote, setEditNote] = useState(null);

  console.log("notes", notes);
  return (
    <div>
      <AddNote onEdit={editNote} />

      <h1 style={{ marginTop: "40px" }}>Note list</h1>
      {notes?.map((note: any) => (
        <div key={note.id} style={{ marginBottom: "10px" }}>
          <p>{note.note}</p>
          <button
            onClick={() => setEditNote(note)}
            style={{
              backgroundColor: "green",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              dispatch({ type: "notes/deleteNote", payload: note.id })
            }
            style={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notes;
