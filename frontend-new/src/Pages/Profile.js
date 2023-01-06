import * as React from 'react';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import useToken from '../useToken';
import Header from './Components/Header';
import { getUserData } from '../api';

export default function Profile() {
    const { token } = useToken();
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");

    React.useEffect(() => {
        getUserData(token).then((res) => {
            setName(res.firstName);
            setLastName(res.lastName);
            setEmail(res.email);
            setUsername(res.username);
        })
    }, [token]);

    return (
        <React.Fragment>
            <Header/>
            <Container sx={{mt: 5}} component="main" maxWidth="lg">
                <Alert severity="success">Добро пожаловать, {name}!</Alert>
                <List component="nav" aria-label="profile data">
                    <ListItem>
                        <ListItemText primary={`Имя: ${name} ${lastName}`} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={`Логин: ${username}`} />
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <ListItemText primary={`Почта: ${email}`} />
                    </ListItem>
                </List>
            </Container>
        </React.Fragment>
    )
}