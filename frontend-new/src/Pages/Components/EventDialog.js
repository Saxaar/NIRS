import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function EventDialog(props) {
  const { onClose, createEvent, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleCreateEvent = () => {
    createEvent({
        name: "asd",
        date: "asd",
        managerFullName: "asd",
        phoneNumber: "phoneNumber"
    });
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Создать новое мероприятие</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Название"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="ФИО Организатора"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Номер телефона"
                type="text"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleCreateEvent()} variant="contained" endIcon={<SendIcon />}>
                Создать
            </Button>
        </DialogActions>
    </Dialog>
  );
}

EventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  createEvent: PropTypes.string.isRequired,
};