import * as React from 'react';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import useToken from '../useToken';
import Header from './Components/Header';
import { getUsersData } from '../api';

export default function Clients() {
    const { token } = useToken();
    const [clients, setClients] = React.useState([]);

    React.useEffect(() => {
        getUsersData(token).then((res) => {
            setClients(res);
            console.log(res);
        });
    }, [token]);

    return (
        <React.Fragment>
            <Header/>
            <Container sx={{mt: 5}} component="main" maxWidth="lg">
                <Stack sx={{ width: '100%' }} spacing={2}>
                {clients.map((client) => {
                    return <Alert severity='info'>
                        {`${client.firstName} ${client.lastName}, `}<a href={'mailto:'+client.email}>{client.email}</a>
                    </Alert>
                })}
                </Stack>
            </Container>
        </React.Fragment>
    )
}