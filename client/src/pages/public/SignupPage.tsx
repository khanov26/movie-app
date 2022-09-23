import React, {useState} from 'react';
import {Alert, Box, Button, CircularProgress, Link, TextField, Typography} from "@mui/material";
import useInput from "../../hooks/input";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import * as userService from "../../services/userService";
import {User} from "../../types/user";
import {useAuth} from "../../auth/useAuth";

const SignupPage: React.FC = () => {
    const email = useInput('');
    const name = useInput('');
    const password = useInput('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();

    const validateFields = () => {
        return [email.value, name.value, password.value].every(value => value !== '');
    };

    const canSignup = !isLoading && validateFields();

    const handleSubmit = async () => {
        setError('');

        setIsLoading(true);
        try {
            const newUser: User = {
                name: name.value,
                email: email.value,
            };
            await userService.create(newUser, password.value);
            await login(email.value, password.value);
            navigate('/user/profile', {replace: true});
        } catch (error) {
            if (typeof error === 'string') {
                setError(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box component="main" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            '& .MuiFormControl-root + .MuiFormControl-root': {
                mt: 2,
            },
        }}>
            <Box sx={{
                maxWidth: 600
            }}>
                <Typography variant="h4" sx={{mb: 2, textAlign: 'center'}}>Регистрация</Typography>
                <Box component="form">
                    <TextField
                        required
                        fullWidth
                        label="Имя"
                        value={name.value}
                        onChange={name.onChange}
                        disabled={isLoading}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Email"
                        value={email.value}
                        onChange={email.onChange}
                        disabled={isLoading}
                    />

                    <TextField
                        required
                        type="password"
                        fullWidth
                        label="Пароль"
                        value={password.value}
                        onChange={password.onChange}
                        disabled={isLoading}
                    />

                    {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}

                    <Button
                        variant="contained"
                        size="large"
                        sx={{mt: 2, width: '100%'}}
                        disabled={!canSignup}
                        onClick={handleSubmit}
                    >
                        {isLoading && <CircularProgress color="inherit" size={20} sx={{mr: 1}}/>}
                        Регистрироваться
                    </Button>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                }}>
                    <Link component={RouterLink} to="/login" underline="hover">Войти</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignupPage;
