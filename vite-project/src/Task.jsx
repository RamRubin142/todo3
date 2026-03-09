import { useState } from "react";
import "./Task.css";
import { useEffect } from "react";

function Task({ description, _id, initialDone, onDelete, onEdit }) {
  const [_done, setDone] = useState(false);

  const update = async () => {
    const response = await fetch("http://localhost:3000/tasks/" + _id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, done: _done }),
    });
    onEdit();
  };
  useEffect(() => {
    update();
  }, [_done]);

  useEffect(() => {
    setDone(initialDone);
  }, []);

  const handleDelete = async () => {
    const response = await fetch("http://localhost:3000/tasks/" + _id, {
      method: "DELETE",
    });
    onDelete(_id);
  };

  return (
    <div id="task-container">
      <div id="check-desc">
        <input
          type="checkbox"
          checked={_done}
          onChange={(event) => setDone(event.target.checked)}
        />
        <p>{description}</p>
      </div>
      <div id="buttons">
        <button id="edit-button">ערוך</button>
        <button id="delete-button" onClick={handleDelete}>
          מחק
        </button>
      </div>
    </div>
  );
}

export default Task;
