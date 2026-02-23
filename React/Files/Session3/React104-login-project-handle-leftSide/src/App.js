import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'
import Menus from './components/Menus/Menus'
import RightSide from './components/RightSide/RightSide'
import LeftSide from './components/LeftSide/LeftSide'

function App() {
    return (
        <Container fluid>
            <Row>
                <Menus />
                <Col xs={12} md={6}>
                    <LeftSide />
                </Col>

                <Col xs={12} md={6}>
                    <RightSide />
                </Col>
            </Row>
        </Container>
    );
}

export default App;