import { useState } from "react";
import "./Task.css";
import { useEffect } from "react";

export const Task = ({ description, _id, initialDone, onDelete, onEdit }) => {
  const [_done, setDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const update = async () => {
    const response = await fetch("http://localhost:3000/tasks/" + _id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descriptionValue, done: _done }),
    });
    onEdit();
  };
  useEffect(() => {
    update();
  }, [_done]);

  useEffect(() => {
    setDescriptionValue(description);
    setDone(initialDone);
  }, []);

  const handleDelete = async () => {
    const response = await fetch("http://localhost:3000/tasks/" + _id, {
      method: "DELETE",
    });
    onDelete(_id);
  };

  const editTaskHandler = async (event) => {
    const enter = 13;
    if (event.keyCode === enter && editValue != "") {
      const response = await fetch("http://localhost:3000/tasks/" + _id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editValue, done: _done }),
      });
      setDescriptionValue(editValue);
      onEdit();
      setIsEditing(false);
    }
  };

  return (
    <div id="task-container">
      <div id="check-desc">
        <input
          type="checkbox"
          checked={_done}
          onChange={(event) => setDone(event.target.checked)}
        />
        <div className="tasks-container">
          {isEditing ? (
            <input
              id="edit-box"
              type="text"
              defaultValue={descriptionValue}
              onChange={(event) => setEditValue(event.target.value)}
              onKeyDown={(event) => {
                editTaskHandler(event);
              }}
            />
          ) : (
            <p>{descriptionValue}</p>
          )}
        </div>
      </div>
      <div id="buttons">
        <button id="edit-button" onClick={() => setIsEditing(true)}>
          ערוך
        </button>
        <button id="delete-button" onClick={handleDelete}>
          מחק
        </button>
      </div>
    </div>
  );
};
