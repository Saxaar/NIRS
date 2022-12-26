import * as React from 'react';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";
import useToken from '../useToken';
import { loginUser } from '../api';

const theme = createTheme();

export default function SignIn() {

    const navigate = useNavigate();
    const { setToken } = useToken();
    const [ loginError, setLoginError ] = React.useState(false);
       

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('email');
        const password = data.get('password');

        const token = await loginUser({
            username,
            password
        });

        if (token.accessToken)
        {
            setLoginError(false);
            setToken({token: token.accessToken, isAdmin: token.authorities[0].authority === "ROLE_ADMIN"});
            navigate("/", { replace: true });
            window.location.reload(false);
        } else {
            setLoginError(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Войти
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Электронная почта"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Запомнить меня"
                />
                {loginError ? <Alert severity="error">Неверный логин или пароль</Alert> : null}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Войти
                </Button>
                <Grid container>
                    <Grid item xs/>
                    <Grid item>
                    <Link href="/signup1" variant="body2">
                        {"Нет аккаунта? Зарегистрироваться"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
        </ThemeProvider>
    );
}