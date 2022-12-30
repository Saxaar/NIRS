import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import useToken from '../useToken';
import Header from './Components/Header';
import { getEventsData, createEvent, deleteEvent, updateEvent } from '../api';
import EventDialog from './Components/EventDialog';
import AproveDialog from './Components/AproveDialog';

export default function Events() {
    const { token, isAdmin } = useToken();
    const [events, setEvents] = React.useState([]);

    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const [createIsEdit, setCreateIsEdit] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(0);

    const [aproveDialogOpen, setAproveDialogOpen] = React.useState(false);
    const [eventDeletion, setEventDeletion] = React.useState(0);

    const handleCreateEvent = (eventData) => {
        createEvent(eventData, token).then((_) => updateEvents(token));
    };

    const handleUpdateEvent = (eventData) => {
        updateEvent(eventData, token).then((_) => updateEvents(token));
    }

    const handleDeleteEvent = () => {
        deleteEvent(eventDeletion, token).then((_) => updateEvents(token));
        setAproveDialogOpen(false);
    };

    const updateEvents = () => {
        getEventsData(token).then((res) => {
            setEvents(res);
        });
    };

    React.useEffect(() => {
        getEventsData(token).then((res) => {
            setEvents(res);
            console.log(res);
        });
    }, [token]);

    return (
        <React.Fragment>
            <Header />
            <Container sx={{ mt: 5 }} component="main" maxWidth="lg">
                {events.map((eventData, index) => {
                    return <Card sx={{ minWidth: 275, mt: 3, position: 'relative' }}>
                        {isAdmin ? <CardHeader
                            action={
                                <React.Fragment>
                                <IconButton onClick={() => {
                                    setCreateIsEdit(true);
                                    setEditIndex(index);
                                    setCreateDialogOpen(true);
                                }} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => {
                                    setEventDeletion(eventData.id);
                                    setAproveDialogOpen(true);
                                }} aria-label="delete">
                                    <CloseIcon />
                                </IconButton>
                                </React.Fragment>
                            }
                            sx={{ position: 'absolute', right: 0 }}
                        /> : null}
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
                {isAdmin ? <Fab onClick={() => {
                    setCreateIsEdit(false);
                    setCreateDialogOpen(true);
                }} sx={{ mt: 3, mb: 3 }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> : null}
                <EventDialog
                    open={createDialogOpen}
                    onClose={() => setCreateDialogOpen(false)}
                    createEvent={createIsEdit ? handleUpdateEvent : handleCreateEvent}
                    isEdit={createIsEdit}
                    editEvent={createIsEdit ? events[editIndex] : undefined}
                />
                <AproveDialog
                    open={aproveDialogOpen}
                    onClose={() => setAproveDialogOpen(false)}
                    onAprove={handleDeleteEvent}
                    text="Вы точно хотите удалить мероприятие?"
                />
            </Container>
        </React.Fragment>
    )
}