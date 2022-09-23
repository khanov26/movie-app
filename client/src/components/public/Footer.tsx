import React from 'react';
import {Box, Container} from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{backgroundColor: 'primary.main', py: 3, color: 'white'}}>
            <Container>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box>&copy; {new Date().getFullYear()}</Box>
                    <Box sx={{fontSize: 10, mt: 1}}>Учебный проект</Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
