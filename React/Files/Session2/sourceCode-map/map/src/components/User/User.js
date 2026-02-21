import React, { Component } from 'react'

export default class User extends Component {
    render() {
        return (
            <div>
                <h1>Name: {this.props.name} | Age: {this.props.age}</h1>
            </div>
        )
    }
}
