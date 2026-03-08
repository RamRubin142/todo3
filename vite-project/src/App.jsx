import { useState, useEffect } from 'react'
import './App.css'
import Task from './Task.jsx'

function App() {
  const [search, setSearch] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");


  useEffect(() => {

    fetch(`http://localhost:3000/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((error) => console.error("Error fetching search results:", error));

  });

  const addTask=(event)=> {
    if (event.keyCode === 13 && newTask != "") {
        
    }
  }

  return (
    <div id="page-container">
      <div id="title-comp">
        <h1>מערכת ניהול המשימות</h1>
      </div>
      
      <div id="input-sections">
        <input 
            
            type="text"
            id="searchBar"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש משימה"
        />
        <input 
            
            type="text"
            id="addBar"
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => addTask(e)}
            placeholder="הוספת משימה"
        />
      </div>
      <div id="tasks">
        
          {taskList.map((task, index) => (
              <Task
                desc={task.description}
              />
          ))}

      </div>
 
      <p>
        הושלמו 1 משימות מתוך 2,נותרו עוד 1 משימות
      </p>
    </div>
  )
}

export default App
