import React, { useState, useEffect } from 'react'
import Header from './Header'
import Todo from './Todo'

export default function TodoList() {


    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState("")
    const [status, setStatus] = useState("all")

    useEffect(() => {
        console.log('TodoList.js => Mount');
    }, [])


    useEffect(() => {
        console.log('TodoList.js => Updating');
    })
    
    const todoTitleHandler = (event) => {
        setTodoTitle(event.target.value)
    }

    const addTodo = (event) => {
        event.preventDefault()

        let newTodoObject = {
            id: todos.length + 1,
            title: todoTitle,
            completed: false
        }

        setTodos(prevState => {
            return [...prevState, newTodoObject]
        })

        setTodoTitle('')
    }

    const removeTodo = (todoId) => {

        let newTodos = todos.filter(todo => {
            return todo.id !== todoId
        })

        setTodos(newTodos)
    }

    const editTodo = (todoId) => {

        let newTodos = [...todos]

        newTodos.forEach(todo => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed
            }
        })

        setTodos(newTodos)

    }

    const statusHandler = (event) => {
        setStatus(event.target.value)
    }

    return (
        <>
            <Header />
            <form onSubmit={addTodo}>
                <input type="text" className="todo-input" maxLength="40" value={todoTitle} onChange={todoTitleHandler} />
                <button className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select name="todos" className="filter-todo" onChange={statusHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div className="todo-container">
                <ul className="todo-list">

                    {
                        status === 'completed' && todos.filter(todo => todo.completed).map(todo => (
                            <Todo key={todo.id} {...todo} onRemove={removeTodo} onEdit={editTodo} />

                        ))
                    }

                    {
                        status === 'uncompleted' && todos.filter(todo => !todo.completed).map(todo => (
                            <Todo key={todo.id} {...todo} onRemove={removeTodo} onEdit={editTodo} />

                        ))
                    }

                    {
                        status === "all" && todos.map(todo => (
                            <Todo key={todo.id} {...todo} onRemove={removeTodo} onEdit={editTodo} />
                        ))
                    }


                </ul>
            </div>
        </>
    )
}