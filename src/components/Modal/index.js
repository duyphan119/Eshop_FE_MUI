import { Box, Button, Modal, Typography } from "@mui/material";

const _Modal = ({
  open,
  handleClose,
  title,
  children,
  handleOk,
  labelOk,
  isCloseAfterOk,
  width,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: width ? width : 500,
          maxHeight: 500,
          bgcolor: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h5" mb={1}>
          {title}
        </Typography>
        {children}
        {handleOk && (
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
              Đóng
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleOk();
                if (isCloseAfterOk) {
                  handleClose();
                }
              }}
            >
              {labelOk}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default _Modal;
