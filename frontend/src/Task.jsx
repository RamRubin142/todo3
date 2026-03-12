import { useState } from "react";
import "./Task.css";
import { useEffect } from "react";
import { deleteTaskById, updateTaskById } from "./api/tasks.api";

export const Task = ({ description, id, isDone, onDelete, onEdit }) => {
  const [done, setDone] = useState(isDone);
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const update = async (event) => {
    setDone(event.target.checked);
    await updateTaskById(id, {
      description: descriptionValue,
      done: event.target.checked,
    });
    onEdit();
  };

  const handleDelete = async () => {
    await deleteTaskById(id);
    onDelete(id);
  };

  const editTaskHandler = async (event) => {
    const ENTER = 13;
    if (event.keyCode === ENTER && descriptionValue ) {
      await updateTaskById(id, {
        description: descriptionValue,
        done: done,
      });
      onEdit();
      setIsEditing(false);
    }
  };

  return (
    <div id="task-container">
      <div id="check-desc">
        <input
          type="checkbox"
          checked={done}
          onChange={(event) => update(event)}
        />
        <div className="tasks-container">
          {isEditing ? (
            <input
              id="edit-box"
              type="text"
              defaultValue={descriptionValue}
              onChange={(event) => setDescriptionValue(event.target.value)}
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
