import React from 'react'
import User from './components/User/User';

class App extends React.Component {
    
    state = {
        users: [
            {id: 1, name: 'Amin', age: 22},
            {id: 2, name: 'Amir', age: 11},
            {id: 3, name: 'Ali', age: 24},
            {id: 4, name: 'Babak', age: 26},
        ]
    }

    render() {
        return (
            <div>
                {this.state.users.map((user) => (
                    <div>
                        <User {...user} />
                    </div>
                ))}
            </div>
        )
    }


}

export default App
