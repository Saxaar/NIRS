import * as React from 'react';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';

import Header from './Components/Header';

export default function Profile() {
    return (
        <React.Fragment>
            <Header/>
            <Container sx={{mt: 5}} component="main" maxWidth="lg">
                <Alert severity="success">Добро пожаловать, Петр!</Alert>
            </Container>
        </React.Fragment>
    )
}