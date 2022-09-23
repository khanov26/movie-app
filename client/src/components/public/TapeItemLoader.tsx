import React from 'react';
import {Card, CardContent, Skeleton} from "@mui/material";

const TapeItemLoader = () => {
    return (
        <Card>
            <Skeleton variant="rectangular" sx={{pt: '150%'}} />
            <CardContent>
                <Skeleton />
                <Skeleton sx={{mt: 2, width: '50%'}} />
            </CardContent>
        </Card>
    );
};

export default TapeItemLoader;
