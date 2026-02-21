import React, { Component } from 'react'
import User from './components/User/User'

export default class App extends Component {

    constructor() {
        super()

        this.state = {
            users: [
                { id: 1, name: 'Mohammad' },
                { id: 2, name: 'Amir' },
                { id: 3, name: 'Ali' },
                { id: 4, name: 'Amin' },
            ]
        }

        this.userRemoveHandler = this.userRemoveHandler.bind(this)
    }

    userRemoveHandler (userId) {
        let newUsers = [...this.state.users]

        let mainUserIndex = newUsers.findIndex(user => {
            return user.id === userId
        })

        newUsers.splice(mainUserIndex, 1)

        this.setState({
            users: newUsers
        })

        console.log(newUsers);
    }

    render() {
        return (
            <div>
                {
                    this.state.users.map(user => (
                        <User key={user.id} {...user} onRemove={this.userRemoveHandler} />
                    ))
                }
            </div>
        )
    }
}
