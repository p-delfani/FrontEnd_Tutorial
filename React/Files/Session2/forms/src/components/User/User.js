import React, { Component } from 'react'

export default class User extends Component {

    removeHandler (id) {
        this.props.removeUser(id)
    }

    render() {
        return (
            <div>
                <h1>Name: {this.props.name} | Age: {this.props.age} | <button onClick={() => this.removeHandler(this.props.id)}>Remove</button></h1>
            </div>
        )
    }
}
