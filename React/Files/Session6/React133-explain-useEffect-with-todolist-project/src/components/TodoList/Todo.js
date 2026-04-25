import React, { useEffect } from 'react'

export default function Todo(props) {

    useEffect(() => {
        console.log('Todo.js => Mount');

        return () => {
            console.log('Todo.js => UnMount');
        }
    }, [])

    useEffect(() => {
        console.log('Todo.js => Updating');
    })

    const removeClickHandler = (id) => {
        props.onRemove(id)
    }

    const editClickHandler = (id) => {
        props.onEdit(id)
    }

    return (
        // 'completed' class for completed todos
        <div className={`todo ${props.completed ? 'completed' : ''}`} style={{ display: 'flex' }}>
            <li className="todo-item">{props.title}</li>

            <button className="check-btn" onClick={() => editClickHandler(props.id)}>
                <i className="fas fa-check" aria-hidden="true"></i>
            </button>

            <button className="trash-btn" onClick={() => removeClickHandler(props.id)}>
                <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    )
}