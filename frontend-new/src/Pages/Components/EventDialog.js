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
  
    const { onClose, createEvent, open, isEdit, editEvent } = props;
    const [eventName, setEventName] = React.useState("");
    const [eventDate, setEventDate] = React.useState(dayjs());
    const [managerName, setManagerName] = React.useState("");
    const [managerPhohe, setManagerPhone] = React.useState("");
  
    const handleClose = () => {
        onClose();
        resetForm();
    };
  
    const resetForm = () => {
        setEventName("");
        setEventDate(dayjs());
        setManagerName("");
        setManagerPhone("");
    }
  
    const validateForm = () => {
        return (eventName === "" || managerName === "" || managerPhohe === "");
    }
  
    const handleCreateEvent = () => {
        if (validateForm()) return;
        
        createEvent({
            name: eventName,
            date: eventDate.format('YYYY-MM-DD'),
            managerFullName: managerName,
            phoneNumber: managerPhohe,
            id: isEdit ? editEvent.id : undefined
        });
        handleClose();
    };
  
    React.useEffect(() => {
        if (isEdit !== true) {
            resetForm();
            return;
        };

        setEventName(editEvent.name);
        setEventDate(dayjs(editEvent.date));
        setManagerName(editEvent.managerFullName);
        setManagerPhone(editEvent.phoneNumber);
    }, [open, isEdit, editEvent]);
  
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{isEdit ? "???????????????? ??????????????????????" : "?????????????? ?????????? ??????????????????????"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="????????????????"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                    <DesktopDatePicker
                        label="????????"
                        inputFormat="DD/MM/YYYY"
                        value={eventDate}
                        onChange={setEventDate}
                        renderInput={(params) => <TextField required sx={{ mt: 3, mb: 2 }} {...params} />}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="managerName"
                        label="?????? ????????????????????????"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="?????????? ????????????????"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={managerPhohe}
                        onChange={(e) => setManagerPhone(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCreateEvent()} variant="contained" endIcon={<SendIcon />}>
                        {isEdit ? "????????????????" : "??????????????"}
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