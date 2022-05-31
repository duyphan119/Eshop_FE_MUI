import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";
const ModalComment = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  comment,
  handleOk,
}) => {
  const [rate, setRate] = useState(comment ? comment.rate : 1);
  const [content, setContent] = useState(comment ? comment.content : "");
  console.log(comment);
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({ rate, content });
      }}
      isCloseAfterOk={isCloseAfterOk}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={3}>
          {new Array(5).fill(1).map((item, index) => (
            <FormControlLabel
              key={index}
              label={`${index + 1} sao`}
              control={
                <Checkbox
                  checked={index + 1 === rate}
                  onChange={() => setRate(index + 1)}
                />
              }
            />
          ))}
        </Grid>
        <Grid item xs={9}>
          <textarea
            placeholder="Nội dung đánh giá"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #000",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalComment;
