import React, { Component } from 'react'

export default function Todo (props) {

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

                <button className="check-btn"  onClick={() => editClickHandler(props.id)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn" onClick={() => removeClickHandler(props.id)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    }