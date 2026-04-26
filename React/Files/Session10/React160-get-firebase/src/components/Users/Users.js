import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(async () => {
        await fetch('https://sabzlearn-3f278-default-rtdb.firebaseio.com/users.json')
            .then(response => response.json())
            .then(data => {
                console.log(Object.entries(data));
                setUsers(Object.entries(data))
            })
    }, [])

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user[1].firstName}</td>
                            <td>{user[1].lastName}</td>
                            <td>{user[1].email}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </>
    );
}
