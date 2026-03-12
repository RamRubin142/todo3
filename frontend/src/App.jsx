import { useState, useEffect } from "react";
import "./App.css";
import { Task } from "./Task.jsx";
import { getTasks, createTask } from "./api/tasks.api";

export const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const finishedTasksCount = taskList.filter((task) => task.done).length;
  var filteredTaskList = taskList.filter((task) =>
    task.description.includes(searchVal)
  );
  

  const fetchDataForUpdating = async () => {
    const data = await getTasks();
    setTaskList(data);
  };

  const fetchData = async () => {
    const data = await getTasks();
    setTaskList(data);
  };

  const deleteTask = async (id) => {
    const filteredList = taskList.filter((task) => task._id != id);
    filteredTaskList = taskList.filter(
      (task) => task._id != id &&  filteredTaskList.includes(task)
    );

    setTaskList(filteredList);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (event, taskDescription) => {
    if (event.key == "Enter" && taskDescription ) {
      const response = await createTask({
        description: taskDescription,
        done: false,
      });
      fetchDataForUpdating();

      if (taskDescription.includes(searchVal)) {
        filteredTaskList = [...filteredTaskList, response];
      }
    }
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
          onChange={(event) => setSearchVal(event.target.value)}
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
            isDone={task.done}
            onDelete={deleteTask}
            onEdit={fetchDataForUpdating}
          />
        ))}
      </div>
      {(taskList.length > 0) ? (
              <p>
          הושלמו {finishedTasksCount} משימות מתוך {taskList.length}, נותרו עוד{" "}
          {taskList.length - finishedTasksCount} משימות
        </p>
      ) : (<p> </p>)
      }


    </div>
  );
};
