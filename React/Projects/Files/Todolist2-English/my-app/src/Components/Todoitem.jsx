import React, { use } from 'react'
import { useState } from 'react';
const Todoitem = (props) => {

    const [isDone , setIsDone] = useState(false);
    const handleClick = ()=>{
        setIsDone(prevV => {
            return !prevV;
        })
    }
  return (
    <div onClick={handleClick}>
      <li style={{textDecoration: isDone ? 'line-through': 'none'}}>
        {props.task}
      </li>
    </div>
  )
}

export default Todoitem;
