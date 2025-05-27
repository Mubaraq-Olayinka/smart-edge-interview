"use client";
import { addNote, updateNote } from "@/api/apiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Note {
  id: any;
  note: string;
}

interface addNoteProps{
    onEdit?:Note | null
}


const AddNote = ({onEdit}:addNoteProps) => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

    useEffect(() => {
    if (onEdit) {
      setNote(onEdit.note);
    }
  }, [onEdit]);

  const handleSubmit = () => {
    if (note.trim() === "") return;

    if (onEdit) {
      dispatch(updateNote({ id: onEdit.id, note }));
      setNote("")
    } else {
      dispatch(addNote(note));
    }

    setNote("");
  };

  //   const handleAddNote = (e: any) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     setNewNote({ ...newNote, [name]: value });
  //   };

  return (
    <div>
      <textarea
        name="note"
        value={note}
        placeholder="Write a note..."
        onChange={(e: any) => setNote(e.target.value)}
        style={{ cursor: "pointer", color: "black" }}
      />

       <button onClick={handleSubmit} style={{ marginLeft: "50px" }}>
        {onEdit ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddNote;
