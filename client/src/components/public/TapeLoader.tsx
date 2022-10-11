import React from 'react';
import StyledTape from './StyledTape';
import { Box } from '@mui/material';
import TapeItemLoader from './TapeItemLoader';

const TapeLoader: React.FC = () => {
  return (
    <StyledTape component="ul">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <Box key={index} component="li" sx={{ flex: '0 0 150px' }}>
            <TapeItemLoader />
          </Box>
        ))}
    </StyledTape>
  );
};

export default TapeLoader;
