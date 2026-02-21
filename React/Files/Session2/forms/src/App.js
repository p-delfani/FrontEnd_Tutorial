import React, { Component } from 'react'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            textareaValue: '',
            isLogin: false
        }

        this.textareaHandler = this.textareaHandler.bind(this)
    }

    userNameHandler(event) {
        console.log(event);
        this.setState({
            username: event.nativeEvent.target.value
        })
    }

    textareaHandler(event) {
        console.log(event);
        this.setState({
            textareaValue: event.nativeEvent.target.value
        })
    }

    isLoginHandler (event) {
        console.log(event.target.value);
        this.setState({
            isLogin: event.nativeEvent.target.checked
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h3>{this.state.username}</h3>
                    <input type="text" value={this.state.username} onChange={(event) => this.userNameHandler(event)} />
                </div>
                <div>
                    <label htmlFor="login">Login</label>
                    <input type="checkbox" id='login' checked={this.state.isLogin} onChange={(event) => this.isLoginHandler(event)} />
                </div>
                <div>
                    <textarea value={this.state.textareaValue} onChange={this.textareaHandler}>
                    </textarea>
                </div>
            </div>
        )
    }
}
