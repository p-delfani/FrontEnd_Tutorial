import React, { Component } from 'react'

export default class Note extends Component {

    render() {
        return (
            <div className="card shadow-sm rounded" style={{ backgroundColor: this.props.color }}><p className="card-text p-3">{this.props.title}</p></div>
        )
    }
}
