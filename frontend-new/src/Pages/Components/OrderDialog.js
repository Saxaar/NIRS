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

    const { onClose, createOrder, open , isEdit, editObject} = props;
    const [orderName, setOrderName] = React.useState("");
    const [orderDate, setOrderDate] = React.useState(dayjs());
    const [orderDescription, setOrderDescription] = React.useState("");
    const [orderSeat, setOrderSeat] = React.useState(1);
    const [orderPrice, setOrderPrice] = React.useState("");

    const handleClose = () => {
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setOrderName("");
        setOrderDate(dayjs());
        setOrderDescription("");
        setOrderSeat(1);
        setOrderPrice("");
    }

    const validateForm = () => {
        return (orderName === "" || orderDescription === "" || orderPrice === "");
    }

    const handleCreateDialog = () => {
        if (validateForm()) return;

        createOrder({
            customerFullName: orderName,
            date: orderDate.format('YYYY-MM-DD'),
            description: orderDescription,
            placeNumber: orderSeat,
            price: orderPrice,
            id: isEdit ? editObject.id : undefined
        });
        handleClose();
    };

    React.useEffect(() => {
        if (isEdit !== true) {
            resetForm();
            return;
        };
        setOrderName(editObject.customerFullName);
        setOrderDate(dayjs(editObject.date));
        setOrderDescription(editObject.description);
        setOrderSeat(editObject.placeNumber);
        setOrderPrice(editObject.price);
      }, [open, isEdit, editObject]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{isEdit ? "Обновить заказ" : "Создать новый заказ"}</DialogTitle>
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
                        required
                    />
                    <DesktopDatePicker
                        label="Срок выполнения"
                        inputFormat="DD/MM/YYYY"
                        value={orderDate}
                        onChange={setOrderDate}
                        renderInput={(params) => <TextField required sx={{ mt: 3, mb: 1 }} {...params} />}
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
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Место"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={orderSeat}
                        onChange={(e) => setOrderSeat(e.target.value)}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Стоимость"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={orderPrice}
                        onChange={(e) => setOrderPrice(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCreateDialog()} variant="contained" endIcon={<SendIcon />}>
                        {isEdit ? "Обновить" : "Создать"}
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