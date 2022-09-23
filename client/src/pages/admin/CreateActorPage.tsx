import React, {useState} from 'react';
import useSnackbar from "../../hooks/snackbar";
import * as actorService from "../../services/actorService";
import {Box, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Actor} from "../../types/actor";
import ActorForm from "../../components/admin/ActorForm";
import {FormType} from "../../types/form";

const CreateActorPage: React.FC = () => {
    const {openSnackbar, snackbar} = useSnackbar();
    const [isSaving, setIsSaving] = useState(false);

    const createActor = async (actor: Actor, profileFile: File | null) => {
        setIsSaving(true);
        try {
            const createdActor: Actor = await actorService.create(actor, profileFile);

            const message =
                <Typography>
                    Актер{' '}
                    <Link component={RouterLink} to={`/admin/actor/update/${createdActor.id}`}>
                        {createdActor.name}
                    </Link>
                    {' '}успешно добавлен
                </Typography>;
            openSnackbar(message);
        } catch (e) {
            openSnackbar('Не удалось добавить актера');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h4" sx={{mb: 2}}>Добавить актера</Typography>
            <ActorForm isSaving={isSaving} onSave={createActor} actor={{} as Actor} formType={FormType.create} />
            {snackbar}
        </Box>
    );
};

export default CreateActorPage;
