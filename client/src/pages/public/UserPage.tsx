import React, {useState} from 'react';
import {
    Alert,
    Box,
    Breadcrumbs,
    CircularProgress,
    Container,
    Link,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import useFetchUser from "../../hooks/fetchUser";
import {useAuth} from "../../auth/useAuth";
import UserForm from "../../components/public/UserForm";
import * as userService from "../../services/userService";
import {User} from "../../types/user";

const UserPage: React.FC = () => {
    const {user: userAuth} = useAuth();
    const {user, isLoading, error: loadingError} = useFetchUser(userAuth!.id);

    const [isSaving, setIsSaving] = useState(false);
    const [savingError, setSavingError] = useState<string>('');

    const handleSave = async (user: User, profileFile: File | null) => {
        setIsSaving(true);
        setSavingError('');
        try {
            const updateData: User = {
                id: userAuth!.id,
                ...user,
            };
            await userService.update(updateData, profileFile);
        } catch (error) {
            if (typeof error === 'string') {
                setSavingError(error);
            } else if (error instanceof Error) {
                setSavingError(error.message);
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box component="main">
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{py: 2}}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">
                        Главная
                    </Link>
                    <Typography color="text.primary">
                        Профиль
                    </Typography>

                </Breadcrumbs>

                {isLoading &&
                <Box sx={{textAlign: 'center'}}>
                    <CircularProgress/>
                </Box>
                }

                {loadingError && <Alert severity="error">{loadingError}</Alert>}

                {user && <UserForm user={user} isSaving={isSaving} onSave={handleSave}/>}
                {savingError && <Alert severity="error" sx={{mt: 2}}>{savingError}</Alert>}
            </Container>
        </Box>
    );
};

export default UserPage;
