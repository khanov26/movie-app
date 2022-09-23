import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import Banner from '../../assets/images/banner.jpg';
import {useNavigate} from "react-router-dom";
import SearchForm from "./SearchForm";

const SearchBanner: React.FC = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (queryValue: string) => {
        navigate(`/search?query=${queryValue}`);
    };

    const backgroundColor = 'rgba(0, 0, 0, 0.8)';

    return (
        <Box sx={{
            background: `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${Banner}) center / cover`,
            color: 'white',
            position: 'relative',
            height: 400,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container>
                <Typography variant="h3" align="center" sx={{mb: 2}}>Добро пожаловать в мир кино!</Typography>
                <SearchForm onSubmit={handleFormSubmit}/>
            </Container>
        </Box>
    );
};

export default SearchBanner;
