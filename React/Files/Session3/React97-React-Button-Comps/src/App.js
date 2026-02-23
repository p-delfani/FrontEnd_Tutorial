import React, { Component } from 'react'
import {Button, Alert} from 'react-bootstrap'

export default class App extends Component {

    state = {
        loading: false
    }

    loadingHandler() {
        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000);
    }

    render() {
        return (
            <div>
                <h1>Hello SabzLearn</h1>
                <hr />
                <Button variant="outline-danger">Click Me</Button>
                <Button variant="outline-danger" size="lg">Click Me</Button>
                <Button variant="outline-success" disabled>Register</Button>
                <hr />
                <Button
                    variant="primary"
                    onClick={this.loadingHandler.bind(this)}
                    disabled={this.state.loading}
                >
                    {this.state.loading ? 'Loading ...' : 'Download File'}
                </Button>
            </div>
        )
    }
}
