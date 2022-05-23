import { Box, Modal } from "@mui/material";
import React from "react";

const ModalComment = ({ open, handleClose }) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Box sx={{ width: "500px" }}>a</Box>
    </Modal>
  );
};

export default ModalComment;
