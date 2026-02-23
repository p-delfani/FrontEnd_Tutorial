import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
    return (
        <>
            {/* <Container fluid> */}
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={4}>1</Col>
                    <Col xs={12} sm={6} md={4}>2</Col>
                    <Col xs={12} sm={6} md={4}>3</Col>
                </Row>
            </Container>
        </>
    );
}

export default App;