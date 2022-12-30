import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';

export default function ActorDialog(props) {

    const { onClose, createActor, open, isEdit, editObject } = props;
    const [actorName, setActorName] = React.useState("");
    const [actorLastName, setActorLastName] = React.useState("");
    const [actorEmail, setActorEmail] = React.useState("");
    const [actorPhone, setActorPhone] = React.useState("");

    const handleClose = () => {
        onClose();
        setActorName("");
        setActorLastName("");
        setActorEmail("");
        setActorPhone("");
    };

    const handleCreateActor = () => {
        createActor({
            firstName: actorName,
            lastName: actorLastName,
            email: actorEmail,
            phoneNumber: actorPhone,
            id: isEdit ? editObject.id : undefined
        });
        handleClose();
    };

    React.useEffect(() => {
        if (isEdit !== true) return;
        setActorName(editObject.firstName);
        setActorLastName(editObject.lastName);
        setActorEmail(editObject.email);
        setActorPhone(editObject.phoneNumber);
      }, [open, isEdit, editObject]);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{isEdit ? "Обновить актёра" : "Добавить нового актёра"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Имя актёра"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={actorName}
                            onChange={(e) => setActorName(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="lastName"
                            label="Фамилия актёра"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={actorLastName}
                            onChange={(e) => setActorLastName(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Эл. почта"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={actorEmail}
                    onChange={(e) => setActorEmail(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Номер телефона"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={actorPhone}
                    onChange={(e) => setActorPhone(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCreateActor()} variant="contained" endIcon={<SendIcon />}>
                    {isEdit ? "Обновить" : "Добавить"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ActorDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    createActor: PropTypes.func.isRequired
};