import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = ({ open, title, text, onConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Không</Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          autoFocus
        >
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
