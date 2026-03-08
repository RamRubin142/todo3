import { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/tasks`);
    const data = await response.json();
    setTaskList(data);
    setFilteredTaskList(data);
  };
  useEffect(() => {
    fetchData();
    
  },[setTaskList]);

  const addTask = async (event) => {
    const enter = 13;
    if (event.keyCode === enter && newTask != "") {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ description: newTask, done: false }),
      });
      fetchData()
      

    }
  };
  useEffect(() => {
    const filtered = taskList.filter(task => task.description.includes(search));
    setFilteredTaskList(filtered);
  }, [search]);

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
          onChange={(event) => setSearch(event.target.value)}
          placeholder="חיפוש משימה"
        />
        <input
          type="text"
          id="addBar"
          className="inputs"
          onChange={(event) => setNewTask(event.target.value)}
          onKeyDown={(event) => addTask(event)}
          placeholder="הוספת משימה"
        />
      </div>
      <div id="tasks">
        {filteredTaskList.map((task, index) => (
          <Task description={task.description} />
        ))}
      </div>

      <p>הושלמו 1 משימות מתוך 2,נותרו עוד 1 משימות</p>
    </div>
  );
}

export default App;
