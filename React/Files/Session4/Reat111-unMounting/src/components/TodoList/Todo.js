import React, { Component } from 'react'

export default class Todo extends React.PureComponent {

    constructor(props) {
        super(props)

        console.log('Todo.js => constructor');
        this.state = {
            todoId: null,
            todoCompleted: null,
            todoTitle: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('Todo.js => getDerivedStateFromProps', props, state);
        console.log('Todo.js => getDerivedStateFromProps');

        return {
            todoId: props.id,
            todoCompleted: props.completed,
            todoTitle: props.title
        }

        // this.setState({
        //     todoId: props.id,
        //     todoCompleted: props.completed,
        //     todoTitle: props.title
        // })
    }

    // shouldComponentUpdate(props, state) {
    //     console.log('Todo.js => shouldComponentUpdate');
    //     // if (this.props.title === props.title) {
    //     //     return false
    //     // }
    //     // return true
    // }

    getSnapshotBeforeUpdate (props, state) {
        console.log('Todo.js => getSnapshotBeforeUpdate', props, state);
        console.log('Todo.js => getSnapshotBeforeUpdate');
        return 20
    }

    componentDidUpdate (props, state, data) {
        console.log('Todo.js => componentDidUpdate', data);
    }

    componentWillMount () {
        console.log('Todo.js => componentWillMount');
    }

    componentDidMount() {
        console.log('Todo.js => componentDidMount');
    }
    
    componentWillUnmount () {
        console.log('Todo.js => componentWillUnmount');
    }

    removeClickHandler(id) {
        this.props.onRemove(id)
    }

    editClickHandler(id) {
        this.props.onEdit(id)
    }

    render() {
        console.log('Todo.js => render');

        let { id, completed, title } = this.props
        return (
            // 'completed' class for completed todos
            <div className={`todo ${this.state.todoCompleted ? 'completed' : ''}`} style={{ display: 'flex' }}>
                <li className="todo-item">{this.state.todoTitle}</li>

                <button className="check-btn" onClick={this.editClickHandler.bind(this, this.state.todoId)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn" onClick={this.removeClickHandler.bind(this, this.state.todoId)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    }
}