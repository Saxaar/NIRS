import * as React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EventDialog(props) {

  const { onClose, createEvent, open } = props;
  const [eventName, setEventName] = React.useState("");
  const [eventDate, setEventDate] = React.useState(dayjs());
  const [managerName, setManagerName] = React.useState("");
  const [managerPhohe, setManagerPhone] = React.useState("");

  const handleClose = () => {
    onClose();
    setEventName("");
    setEventDate(dayjs());
    setManagerName("");
    setManagerPhone("");
  };

  const handleCreateEvent = () => {
    createEvent({
      name: eventName,
      date: eventDate.format('YYYY-MM-DD'),
      managerFullName: managerName,
      phoneNumber: managerPhohe
    });
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <DesktopDatePicker
            label="Дата"
            inputFormat="DD/MM/YYYY"
            value={eventDate}
            onChange={setEventDate}
            renderInput={(params) => <TextField sx={{ mt: 4 }} {...params} />}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ФИО Организатора"
            type="text"
            fullWidth
            variant="standard"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Номер телефона"
            type="text"
            fullWidth
            variant="standard"
            value={managerPhohe}
            onChange={(e) => setManagerPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCreateEvent()} variant="contained" endIcon={<SendIcon />}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

EventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  createEvent: PropTypes.func.isRequired
};