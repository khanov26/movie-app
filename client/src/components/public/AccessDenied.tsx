import React, { useEffect } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
  }, [navigate]);

  return (
    <Alert severity="error" sx={{ m: 2 }}>
      У вас недостаточно прав для просмотра этой страницы
    </Alert>
  );
};

export default AccessDenied;
