import React, { ReactNode, useState } from 'react';
import { Snackbar } from '@mui/material';

export default function useSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<ReactNode>(null);

  const openSnackbar = (message: ReactNode) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const snackbar = (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
    />
  );

  return {
    openSnackbar,
    snackbar,
  };
}
