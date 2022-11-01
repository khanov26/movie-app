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
import {
  Navigate,
  useLocation,
  useNavigate,
  Link as RouterLink,
} from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { useLoginMutation } from '../../store/auth/authSlice';
import { parseRTKQueryError } from '../../utils/error';

interface LocationState {
  from: Location;
}

interface LoginError {
  field: string;
  errorText: string;
}

const LoginPage: React.FC = () => {
  const email = useInput('');
  const password = useInput('');

  const auth = useAppSelector((state) => state.auth);
  const [login, {isLoading, error}] = useLoginMutation();
  const loginError = error && 'data' in error ? error.data as LoginError : null;

  const location = useLocation();
  const navigate = useNavigate();

  const validateFields = () => {
    return [email.value, password.value].every((value) => value !== '');
  };

  const canLogin = !isLoading && validateFields();

  const handleSubmit = async () => {
    try {
      await login({ email: email.value, password: password.value }).unwrap();
      const from = (location.state as LocationState)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {}
  };

  if (auth) {
    const from = (location.state as LocationState)?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Войти
        </Typography>
        <Box component="form">
          <TextField
            required
            fullWidth
            label="Email"
            value={email.value}
            onChange={email.onChange}
            disabled={isLoading}
            error={loginError?.field === 'email'}
            helperText={loginError?.field === 'email' && loginError.errorText}
          />

          <TextField
            required
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            label="Пароль"
            value={password.value}
            onChange={password.onChange}
            disabled={isLoading}
            error={loginError?.field === 'password'}
            helperText={
              loginError?.field === 'password' && loginError.errorText
            }
          />

          {!loginError && error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {parseRTKQueryError(error) as string}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, width: '100%' }}
            disabled={!canLogin}
            onClick={handleSubmit}
          >
            {isLoading && (
              <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
            )}
            Войти
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}
        >
          <Link component={RouterLink} to="/signup" underline="hover">
            Регистрация
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
