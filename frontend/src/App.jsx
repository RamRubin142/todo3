import { useState, useEffect } from "react";
import "./App.css";
import { Task } from "./Task.jsx";
import { getTasks, createTask } from "./api/tasks.api";

export const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const finishedTasksCount = taskList.filter((task) => task.done).length;

  const fetchDataForUpdating = async () => {
    const data = await getTasks();
    setTaskList(data);
  };

  const fetchData = async () => {
    const data = await getTasks();
    setTaskList(data);
    setFilteredTaskList(data);
  };

  const fetchDataForAdding = async () => {
    const data = await getTasks();
    setTaskList(data);
  };

  const deleteTask = async (id) => {
    const filteredList = taskList.filter((task) => task._id != id);
    const filteredFilteredList = filteredTaskList.filter(
      (task) => task._id != id
    );

    setTaskList(filteredList);
    setFilteredTaskList(filteredFilteredList);
    getFinishedCount();
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (event, taskDescription) => {
    const ENTER = 13;
    if (event.keyCode === ENTER && taskDescription != "") {
      const response = await createTask({
        description: taskDescription,
        done: false,
      });
      fetchDataForAdding();

      if (taskDescription.includes(searchVal)) {
        setFilteredTaskList([...filteredTaskList, response]);
      }
    }
  };

  const handleSearch = async (searchItem) => {
    setSearchVal(searchItem);

    const filtered = taskList.filter((task) =>
      task.description.includes(searchItem)
    );

    setFilteredTaskList(filtered);
  };

  return (
    <div id="page-container">
      <div id="title-comp">
        <h1>מערכת ניהול המשימות</h1>
      </div>

      <div id="input-sections">
        <input
          type="text"
          id="searchBar"
          className="inputs"
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="חיפוש משימה"
        />
        <input
          type="text"
          id="addBar"
          className="inputs"
          onKeyDown={(event) => addTask(event, event.target.value)}
          placeholder="הוספת משימה"
        />
      </div>
      <div id="tasks">
        {filteredTaskList.map((task) => (
          <Task
            key={task._id}
            description={task.description}
            id={task._id}
            initialDone={task.done}
            onDelete={deleteTask}
            onEdit={fetchDataForUpdating}
          />
        ))}
      </div>

      <p>
        הושלמו {finishedTasksCount} משימות מתוך {taskList.length}, נותרו עוד{" "}
        {taskList.length - finishedTasksCount} משימות
      </p>
    </div>
  );
};
