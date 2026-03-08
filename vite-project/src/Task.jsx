import { useState } from 'react'
import './Task.css'

function Task({description, done, _id}) {
  

  return (

      <div id="task-container">
        <div id="check-desc">
            <input 
                type="checkbox" 
            />
            <p>{description}</p>

        </div>
        <div id="buttons">
          <button id="edit-button">ערוך</button>
          <button id="delete-button">מחק</button>

        </div>
        


      </div>
 

  )
}

export default Task
