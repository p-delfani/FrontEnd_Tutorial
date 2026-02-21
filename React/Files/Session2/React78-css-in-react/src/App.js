import React, { Component } from 'react'
import User from './components/User'
import './App.css'

export default class App extends Component {

    render() {
        return (
            <div>
                {/* <h1 style={{color: 'red', fontSize: '10rem'}}>SabzLearn.ir :)</h1> */}
                <h1>SabzLearn.ir :)</h1>
                <hr />
                <User />
            </div>
        )
    }
}
