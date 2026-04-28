import React, { useState } from 'react'
import User from './Components/User'

export default function App() {

  
  const [text, setText] = useState('')

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Message />
      <User />
    </div>
  )
}

const Message = () => {
  const [title, setTitle] = useState('')

  return (
      <div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          
      </div>
  )
}