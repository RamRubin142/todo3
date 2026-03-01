import { useState } from 'react'
import './Task.css'

function Task({desc}) {


  return (

      <div id="task-container">
        <div id="check-desc">
            <input 
                type="checkbox" 
            />
            <p>{desc}</p>

        </div>
        <div id="buttons">
          <button id="edit-button">ערוך</button>
          <button id="delete-button">מחק</button>

        </div>
        


      </div>
 

  )
}

export default Task
