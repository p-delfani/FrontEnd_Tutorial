import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'

export default function Users() {

    const [users, setUsers] = useState([])
    const [userID, setUserID] = useState("")
    const [getData, setGetData] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(async () => {
        await fetch('https://sabzlearn-3f278-default-rtdb.firebaseio.com/users.json')
            .then(response => response.json())
            .then(data => {
                console.log(Object.entries(data));
                setUsers(Object.entries(data))
            })
    }, [getData])

    const removeHandler = async () => {
        
        await fetch(`https://sabzlearn-3f278-default-rtdb.firebaseio.com/users/${userID}.json`, {
            method: 'DELETE'
        }).then(response => console.log(response))
        
        setShowDeleteModal(false)
        setGetData(prev => !prev)
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user[1].firstName}</td>
                            <td>{user[1].lastName}</td>
                            <td>{user[1].email}</td>
                            <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <AiFillDelete
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setShowDeleteModal(true)
                                        setUserID(user[0])
                                    }}
                                />
                                <AiFillEdit style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>

            <Modal
                show={showDeleteModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Confirm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Are you sure to delete this user?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button onClick={() => removeHandler()}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
