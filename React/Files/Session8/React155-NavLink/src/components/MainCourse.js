import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import CoursesData from './../CoursesData'

export default function MainCourse() {

    let params = useParams()

    let mainCouseData = CoursesData.find(course => course.id == params.courseID)

    console.log(mainCouseData);


    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <img src={mainCouseData.img} style={{width: '80%', height: '300px'}}/>
                </Col>
                <Col>
                    <h2>{mainCouseData.title}</h2>
                    <p>{mainCouseData.description}</p>
                </Col>
            </Row>
        </Container>
    )
}
