import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'

export default class App extends Component {


    render() {
        return (
            <div className="container mt-5">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://sabzlearn.ir/wp-content/uploads/2021/11/244.png" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="success">Buy Course</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://sabzlearn.ir/wp-content/uploads/2021/11/244.png" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="success">Buy Course</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
