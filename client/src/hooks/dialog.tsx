import { ReactNode, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<ReactNode>();

  const confirmFunc = useRef<() => void>();

  const openDialog = (
    message: ReactNode,
    onConfirm: () => void,
    onReject?: () => void
  ) => {
    setMessage(message);
    setIsOpen(true);
    confirmFunc.current = onConfirm;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    confirmFunc.current!();
    handleClose();
  };

  const dialog = (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Отменить
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          autoFocus
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    openDialog,
    dialog,
  };
}
