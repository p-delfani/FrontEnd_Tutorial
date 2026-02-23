import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'
import Menus from './components/Menus/Menus'
import RightSide from './components/RightSide/RightSide'

function App() {
    return (
        <Container fluid>
            <Row>
                <Menus />
                <Col>
                </Col>
                
                <Col>
                    <RightSide />
                </Col>
            </Row>
        </Container>
    );
}

export default App;