import React from 'react';
import Section from "./Section";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import {Actor} from "../../types/actor";
import {calculateFullYearDiff} from "../../utils/date";
import {yearDeclension} from "../../utils/wordDeclension";

interface Props {
    actor: Actor;
}

const getAge = (date1: string | number, date2: string | number) => {
    const age = calculateFullYearDiff(date1, date2);
    const label = yearDeclension(age);

    return `${age} ${label}`;
};

const ActorInfo: React.FC<Props> = ({actor}) => {
    return (
        <Section>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Box component="img" src={actor.profile} sx={{width: '100%', borderRadius: 2}}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h4" sx={{mt: 1}}>{actor.name}</Typography>

                        <Typography variant="h6" sx={{mt: 2, mb: 1}}>Персональная информация</Typography>

                        <Stack direction="row" spacing={2}>
                            {actor.birthday &&
                            <Box>
                                <Typography variant="subtitle2">Дата рождения</Typography>
                                <Typography variant="body2">
                                    {new Date(actor.birthday).toLocaleDateString()}
                                    {!actor.deathday &&
                                    ` (${getAge(actor.birthday, Date.now())})`
                                    }
                                </Typography>
                            </Box>
                            }

                            {actor.deathday &&
                            <Box>
                                <Typography variant="subtitle2">Дата смерти</Typography>
                                <Typography variant="body2">
                                    {new Date(actor.deathday).toLocaleDateString()}
                                    {actor.birthday &&
                                    ` (${getAge(actor.birthday, actor.deathday)})`
                                    }
                                </Typography>
                            </Box>
                            }
                        </Stack>

                        {actor.biography &&
                        <>
                            <Typography variant="h6" sx={{mt: 2}}>Биография</Typography>
                            <Typography sx={{mt: 1}}>
                                {actor.biography}
                            </Typography>
                        </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Section>
    );
};

export default ActorInfo;
