import React, { Component } from 'react'
import TodoList from './components/TodoList/TodoList'
import './App.css'

export default class App extends Component {

    constructor (props) {
        super(props)

        console.log('App.js => constructor');

        this.state = {

        }
    } 

    static getDerivedStateFromProps () {
        console.log('App.js => getDerivedStateFromProps');
    }

    render() {
        return (
            <div>
                <TodoList></TodoList>
            </div>
        )
    }
}
