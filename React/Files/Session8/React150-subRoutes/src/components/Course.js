import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Course(props) {
    return (
        <Link to={`/course/${props.id}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        {props.price}
                    </Card.Text>
                    <Button variant="primary">Get Course</Button>
                </Card.Body>
            </Card>
        </Link>
    )
}
