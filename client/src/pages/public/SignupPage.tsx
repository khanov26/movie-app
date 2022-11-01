import React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import useInput from '../../hooks/input';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { useLoginMutation } from '../../store/auth/authSlice';
import { useAddUserMutation } from '../../store/user/userSlice';
import { parseRTKQueryError } from '../../utils/error';

const SignupPage: React.FC = () => {
  const email = useInput('');
  const name = useInput('');
  const password = useInput('');

  const navigate = useNavigate();
  
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const [create, { isLoading: isCreateLoading, error: createError }] =
    useAddUserMutation();

  const isLoading = isLoginLoading || isCreateLoading;

  const error = loginError || createError;

  const validateFields = () => {
    return [email.value, name.value, password.value].every(
      (value) => value !== ''
    );
  };

  const canSignup = !isLoading && validateFields();

  const handleSubmit = async () => {
    try {
      const newUser: User = {
        name: name.value,
        email: email.value,
      };
      await create({ user: newUser, password: password.value }).unwrap();
      await login({ email: email.value, password: password.value }).unwrap();
      navigate('/user/profile', { replace: true });
    } catch (error) {}
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        '& .MuiFormControl-root + .MuiFormControl-root': {
          mt: 2,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Регистрация
        </Typography>
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

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {parseRTKQueryError(error) as string}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, width: '100%' }}
            disabled={!canSignup}
            onClick={handleSubmit}
          >
            {isLoading && (
              <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
            )}
            Регистрироваться
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}
        >
          <Link component={RouterLink} to="/login" underline="hover">
            Войти
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
