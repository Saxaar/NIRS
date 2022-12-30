import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import useToken from '../useToken';
import Header from './Components/Header';
import { getActorsData, createActor, deleteActor } from '../api';
import ActorDialog from './Components/ActorDialog';
import AproveDialog from './Components/AproveDialog';

export default function Actors() {
    const { token, isAdmin } = useToken();
    const [actors, createActors] = React.useState([]);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const [aproveDialogOpen, setAproveDialogOpen] = React.useState(false);
    const [actorDeletion, setActorDeletion] = React.useState(0);

    const handleCreateActor = (actorData) => {
        createActor(actorData, token).then((_) => updateActors(token));
    };

    const handleDeleteActor = () => {
        deleteActor(actorDeletion, token).then((_) => updateActors(token));
        setAproveDialogOpen(false);
    };

    const updateActors = () => {
        getActorsData(token).then((res) => {
            createActors(res);
        });
    };

    React.useEffect(() => {
        getActorsData(token).then((res) => {
            createActors(res);
            console.log(res);
        });
    }, [token]);

    return (
        <React.Fragment>
            <Header />
            <Container sx={{ mt: 5 }} component="main" maxWidth="lg">
                {actors.map((actorData) => {
                    return <Card sx={{ minWidth: 275, mt: 3, position: 'relative' }}>
                        {isAdmin ? <CardHeader
                            action={
                                <IconButton onClick={() => {
                                    setActorDeletion(actorData.id);
                                    setAproveDialogOpen(true);
                                }} aria-label="settings">
                                    <CloseIcon />
                                </IconButton>
                            }
                            sx={{ position: 'absolute', right: 0 }}
                        /> : null}
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Актёр
                            </Typography>
                            <Typography sx={{ mb: 3 }} variant="h5" component="div">
                                {actorData.firstName} {actorData.lastName}
                            </Typography>
                            <Typography variant="body2">
                                <a href={"mailto:" + actorData.email}>{actorData.email}</a>
                                <br />
                                <a href={"tel:" + actorData.phoneNumber}>{actorData.phoneNumber}</a>
                            </Typography>
                        </CardContent>
                    </Card>
                })}
                {isAdmin ? <Fab onClick={() => setCreateDialogOpen(true)} sx={{ mt: 3, mb: 3 }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> : null}
                <ActorDialog
                    open={createDialogOpen}
                    onClose={() => setCreateDialogOpen(false)}
                    createActor={handleCreateActor}
                />
                <AproveDialog
                    open={aproveDialogOpen}
                    onClose={() => setAproveDialogOpen(false)}
                    onAprove={handleDeleteActor}
                    text="Вы точно хотите удалить актёра?"
                />
            </Container>
        </React.Fragment>
    )
}