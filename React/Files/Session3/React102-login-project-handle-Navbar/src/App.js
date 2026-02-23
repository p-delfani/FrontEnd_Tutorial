import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Menus from './components/Menus/Menus'

function App() {
    return (
        <Container fluid>
            <Row>
                <Menus />
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default App;