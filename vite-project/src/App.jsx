import { useState } from 'react'
import './App.css'
import Task from './Task.jsx'

function App() {
  const [search, setSearch] = useState("")
  const [task,taskBar] = useState("")

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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="הוספת משימה"
        />
      </div>
      <div id="tasks">
        <Task desc={"לנקות את הבית"} />
        <Task desc={"לסיים חפיפה"} />
      </div>
 
      <p>
        הושלמו 1 משימות מתוך 2,נותרו עוד 1 משימות
      </p>
    </div>
  )
}

export default App
