import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import useToken from '../useToken';
import Header from './Components/Header';
import { getEventsData } from '../api';
import EventDialog from './Components/EventDialog';

export default function Events() {
    const { token, isAdmin } = useToken();
    const [ events, setEvents ] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const createEvent = (eventData) => {

    };

    React.useEffect(() => {
        getEventsData(token).then((res) => {
            console.log(res);
            setEvents(res);
        })
    }, [token]);

    return (
        <React.Fragment>
            <Header/>
            <Container sx={{mt: 5}} component="main" maxWidth="lg">
                {events.map((eventData) => {
                    return <Card sx={{ minWidth: 275, mt: 3 }}>
                        <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Театральное выступление
                        </Typography>
                        <Typography variant="h5" component="div">
                            {eventData.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {new Date(eventData.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Контакт: {eventData.managerFullName}
                            <br />
                            <a href={"tel:" + eventData.phoneNumber}>{eventData.phoneNumber}</a>
                        </Typography>
                        </CardContent>
                  </Card>
                })}
                {isAdmin ? <Fab onClick={handleClickOpen} sx={{mt: 3}} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> : null}
            <EventDialog
                open={open}
                onClose={handleClose}
                createEvent={createEvent}
            />
            </Container>
        </React.Fragment>
    )
}