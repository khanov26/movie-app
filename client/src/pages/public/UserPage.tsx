import React from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import UserForm from '../../components/public/UserForm';
import { User } from '../../types/user';
import { useAppSelector } from '../../hooks/store';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../store/user/userSlice';
import { parseRTKQueryError } from '../../utils/error';

const UserPage: React.FC = () => {
  const userAuth = useAppSelector((state) => state.auth);

  const {
    data: user,
    isLoading,
    error: loadingError,
  } = useGetUserQuery(userAuth!.id);

  const [update, { isLoading: isSaving, error: savingError }] =
    useUpdateUserMutation();

  const handleSave = async (user: User, profile: File | null) => {
    const updateData: User = {
      id: userAuth!.id,
      ...user,
    };
    await update({ user: updateData, profile });
  };

  return (
    <Box component="main">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ py: 2 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Главная
          </Link>
          <Typography color="text.primary">Профиль</Typography>
        </Breadcrumbs>

        {isLoading && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )}

        {loadingError && (
          <Alert severity="error">
            {parseRTKQueryError(loadingError) as string}
          </Alert>
        )}

        {user && (
          <UserForm user={user} isSaving={isSaving} onSave={handleSave} />
        )}
        {savingError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {parseRTKQueryError(savingError) as string}
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default UserPage;
