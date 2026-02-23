import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import './App.css'

export default class App extends Component {

    state = {
        showModal: true
    }


    render() {
        return (
            <div>
                <Modal centered show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="rtl-text">
                        <p>آیا از حذف مطمئن هستید؟</p>
                    </Modal.Body>

                    <Modal.Footer className="left-btns">
                        <Button variant="secondary" onClick={() => this.setState({showModal: false})}>Cancel</Button>
                        <Button variant="primary" style={{backgroundColor: 'purple'}}>Yes, Remove</Button>
                    </Modal.Footer>
                </Modal >

                <Button onClick={() => this.setState({showModal: true})}>Remove File</Button>
            </div>
        )
    }
}
