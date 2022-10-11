import React from 'react';
import { Box, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const getStrokeColor = (value: number, theme: Theme) => {
  if (value > 7) {
    return theme.palette.success.main;
  } else if (value > 5) {
    return theme.palette.warning.main;
  }
  return theme.palette.error.main;
};

interface Props {
  value: number;
}

const Rating: React.FC<Props> = ({ value }) => {
  value = Math.round(value * 10) / 10;

  const circleLength = Number((2 * Math.PI * 40).toFixed(2));
  const circleNonFilledLength = Number(
    ((circleLength * (10 - value)) / 10).toFixed(2)
  );

  if (value === 0) {
    return null;
  }

  return (
    <Box
      component="svg"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Box
        component="circle"
        r="40"
        cx="50"
        cy="50"
        sx={{
          fill: '#212121',
          stroke: (theme) => alpha(getStrokeColor(value, theme), 0.4),
          strokeWidth: 10,
          strokeDasharray: circleLength,
          strokeDashoffset: 0,
        }}
      />
      <Box
        component="circle"
        r="40"
        cx="50"
        cy="50"
        sx={{
          fill: 'transparent',
          stroke: (theme) => getStrokeColor(value, theme),
          strokeWidth: 10,
          strokeDasharray: circleLength,
          strokeDashoffset: circleNonFilledLength,
          transform: 'rotateZ(-90deg)',
          transformOrigin: 'center',
        }}
      />
      <Box
        component="text"
        x="50"
        y="50"
        sx={{
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fill: 'white',
          fontSize: '1.5rem',
        }}
      >
        {value}
      </Box>
    </Box>
  );
};

export default Rating;
