import React, { useEffect, useRef } from "react";
import './App.css'

export default function App() {

  const usernameInputRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    console.log(usernameInputRef);
    usernameInputRef.current.focus()
  }, [])

  const addNewValue = () =>{
    usernameInputRef.current.value = 'SabzLearn.ir :))'
  }

  const addNewClass = () => {
    usernameInputRef.current.classList.add('bg-red')
    titleRef.current.classList.add('color-blue')
  }

  return (
    <div>
      <h3 ref={titleRef}>SabzLearn.ir</h3>
      <input ref={usernameInputRef} type="text" placeholder="Username" />
      <button onClick={addNewValue}>Add New Value</button>
      <button onClick={addNewClass}>Add New Class</button>
    </div>
  );
}
