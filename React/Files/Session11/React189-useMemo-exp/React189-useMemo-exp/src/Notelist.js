import React, { useState, useMemo } from 'react'

export default function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  const addNewNote = () => {
    let newNoteObj = {
      id: notes.length + 1,
      title: newNote
    }

    setNotes(prevNotes => [...prevNotes, newNoteObj])
    setNewNote('')
  }


  return (
    <>
      <input type="text"
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
      />
      <button onClick={addNewNote}>Add New Note</button>
      <hr />
      <h3>All Notes</h3>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.id} - {note.title}</li>
        ))}
      </ul>
      <hr />
      <h3>Js Included Notes</h3>
      {useMemo(() => {
        return notes.filter(note => {
          console.log('Filter Run !!');
          return note.title.toLowerCase().includes('js')
        }).map(note => (
          <div key={note.id}>
            <li>{note.id} - {note.title}</li>
          </div>
        ))
      }, [notes])}
    </>
  )
}
