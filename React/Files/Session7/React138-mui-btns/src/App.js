import React, { useState } from 'react'
import { Button, Container, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

// npm install @emotion/react @emotion/styled

export default function App() {
    return (
        <Container style={{ marginTop: 25 }}>
            {/* <Button variant="outlined" disabled>Delete</Button> */}
            <Button variant="contained" color="error" endIcon={<DeleteIcon />}>Delete</Button>
            <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={() => alert('Send :)')}>Send</Button>
            
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCameraIcon />
            </IconButton>
        </Container>
    )
}
