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

export default function OrderDialog(props) {

    const { onClose, createOrder, open } = props;
    const [orderName, setOrderName] = React.useState("");
    const [orderDate, setOrderDate] = React.useState(dayjs());
    const [orderDescription, setOrderDescription] = React.useState("");
    const [orderPrice, setOrderPrice] = React.useState("");

    const handleClose = () => {
        onClose();
        setOrderName("");
        setOrderDate(dayjs());
        setOrderDescription("");
        setOrderPrice("");
    };

    const handleCreateDialog = () => {
        createOrder({
            customerFullName: orderName,
            date: orderDate.format('YYYY-MM-DD'),
            description: orderDescription,
            price: orderPrice
        });
        handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Создать новый заказ</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Заказчик"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                    />
                    <DesktopDatePicker
                        label="Срок выполнения"
                        inputFormat="DD/MM/YYYY"
                        value={orderDate}
                        onChange={setOrderDate}
                        renderInput={(params) => <TextField sx={{ mt: 4 }} {...params} />}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Описание"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={orderDescription}
                        onChange={(e) => setOrderDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Стоимость"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={orderPrice}
                        onChange={(e) => setOrderPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCreateDialog()} variant="contained" endIcon={<SendIcon />}>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}

OrderDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    createOrder: PropTypes.func.isRequired
};