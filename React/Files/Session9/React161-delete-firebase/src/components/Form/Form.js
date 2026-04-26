import React, { useState, useEffect } from "react";
import "./Form.css";

export default function Form() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])

    const registerHandler = event => {
        event.preventDefault()

        let userInfo = {
            firstName,
            lastName,
            email
        }

        fetch('https://sabzlearn-3f278-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(userInfo)
        }).then(response => console.log(response))
    }

    return (
        <div className="form-container">
            <form className="register-form" autoComplete="off" onSubmit={registerHandler}>
                <input
                    id="first-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="form-field"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                />
                <input
                    id="last-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="form-field"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                />

                <input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                <button className="form-field" type="submit">
                    Register
                </button>
            </form>
        </div>

    )
}