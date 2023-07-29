import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Successfully", "success");
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              value={note.title}
              minLength={5}
              required
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">
              Description
            </label>
            <input
              value={note.description}
              minLength={5}
              required
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label for="tag" className="form-label">
              Tag
            </label>
            <input
              value={note.tag}
              minLength={5}
              required
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onchange}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
