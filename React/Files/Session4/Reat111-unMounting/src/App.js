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

    shouldComponentUpdate () {
        console.log('App.js => shouldComponentUpdate');
        return true
    }

    componentDidMount () {
        console.log('App.js => componentDidMount');
    }

    render() {
        console.log('App.js => render');
        return (
            <div>
                <TodoList></TodoList>
            </div>
        )
    }
}
