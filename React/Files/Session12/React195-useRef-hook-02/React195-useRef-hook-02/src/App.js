import React, { useRef, useState } from 'react'

export default function App() {

  const [course, setCourse] = useState('JS')
  const courseRef = useRef('Npm')

  const changeState = () => {
    setCourse('React Js')
  }
  
  const changeRef = () => {
    courseRef.current = 'Vue Js'
    console.log(courseRef);
  }

  return (
    <div>
      <h3>Course(State): {course}</h3>
      <hr />
      <h3>Course(Ref): {courseRef.current}</h3>
      <hr />
      <button onClick={changeState}>Update Course (State)</button>
      <button onClick={changeRef}>Update Course (Ref)</button>
    </div>
  )
}
