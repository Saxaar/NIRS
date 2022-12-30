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
import { getOrdersData, createOrder, deleteOrder, updateOrder } from '../api';
import OrderDialog from './Components/OrderDialog';
import AproveDialog from './Components/AproveDialog';

export default function Orders() {
    const { token, isAdmin } = useToken();
    const [orders, setOrders] = React.useState([]);

    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const [createIsEdit, setCreateIsEdit] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(0);

    const [aproveDialogOpen, setAproveDialogOpen] = React.useState(false);
    const [orderDeletion, setOrderDeletion] = React.useState(0);

    const handleCreateOrder = (orderData) => {
        createOrder(orderData, token).then((_) => updateOrders(token));
    };

    const handleUpdateOrder = (orderData) => {
        updateOrder(orderData, token).then((_) => updateOrders(token));
    }

    const handleDeleteOrder = () => {
        deleteOrder(orderDeletion, token).then((_) => updateOrders(token));
        setAproveDialogOpen(false);
    };

    const updateOrders = () => {
        getOrdersData(token).then((res) => {
            setOrders(res);
        });
    };

    React.useEffect(() => {
        getOrdersData(token).then((res) => {
            setOrders(res);
            console.log(res);
        });
    }, [token]);

    return (
        <React.Fragment>
            <Header />
            <Container sx={{ mt: 5 }} component="main" maxWidth="lg">
                {orders.map((orderData, index) => {
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
                                    setOrderDeletion(orderData.id);
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
                                Заказ
                            </Typography>
                            <Typography variant="h5" component="div">
                                {orderData.customerFullName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {new Date(orderData.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2">
                                {orderData.description}
                            </Typography>
                            <Typography sx={{mt: 1}} variant="body2">
                                Место: {orderData.placeNumber}
                                <br/>
                                <b>Стоимость: {orderData.price} руб.</b>
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
                <OrderDialog
                    open={createDialogOpen}
                    onClose={() => setCreateDialogOpen(false)}
                    createOrder={createIsEdit ? handleUpdateOrder : handleCreateOrder}
                    isEdit={createIsEdit}
                    editObject={createIsEdit ? orders[editIndex] : undefined}
                />
                <AproveDialog
                    open={aproveDialogOpen}
                    onClose={() => setAproveDialogOpen(false)}
                    onAprove={handleDeleteOrder}
                    text="Вы точно хотите удалить заказ?"
                />
            </Container>
        </React.Fragment>
    )
}