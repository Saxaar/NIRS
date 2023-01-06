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
import { getOrdersData, createOrder, deleteOrder, updateOrder, getUserData, getUserOrdersData } from '../api';
import OrderDialog from './Components/OrderDialog';
import AproveDialog from './Components/AproveDialog';

export default function Orders() {
    const { token, isAdmin } = useToken();
    const [email, setEmail] = React.useState("");
    const [orders, setOrders] = React.useState([]);

    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const [createIsEdit, setCreateIsEdit] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(0);

    const [aproveDialogOpen, setAproveDialogOpen] = React.useState(false);
    const [orderDeletion, setOrderDeletion] = React.useState(0);

    const handleCreateOrder = (orderData) => {
        orderData.customerEmail = email;
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
        if (isAdmin)
        {
            getOrdersData(token).then((res) => {
                setOrders(res);
            });
        } else {
            getUserOrdersData(token, email).then((orderRes) => {
                setOrders(orderRes);
                console.log(orderRes);
            });
        }
    };

    React.useEffect(() => {
        getUserData(token).then((res) => {
            setEmail(res.email);
            if (isAdmin)
            {
                getOrdersData(token).then((res) => {
                    setOrders(res);
                    console.log(res);
                });
            } else {
                getUserOrdersData(token, res.email).then((orderRes) => {
                    setOrders(orderRes);
                    console.log(orderRes);
                });
            }
        })
    }, [token, isAdmin]);

    return (
        <React.Fragment>
            <Header />
            <Container sx={{ mt: 5 }} component="main" maxWidth="lg">
                {orders.map((orderData, index) => {
                    return <Card sx={{ minWidth: 275, mt: 3, position: 'relative' }}>
                        <CardHeader
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
                        />
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
                {orders.length === 0 ? <Card sx={{ minWidth: 275, mt: 3, position: 'relative' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Нет заказов
                        </Typography>
                    </CardContent>
                </Card> : null}
                <Fab onClick={() => {
                    setCreateIsEdit(false);
                    setCreateDialogOpen(true);
                }} sx={{ mt: 3, mb: 3 }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
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