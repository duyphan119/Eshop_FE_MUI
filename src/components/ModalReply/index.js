import { useState } from "react";

import Modal from "../Modal";

const ModalReply = ({
  open,
  handleClose,
  title,
  comment,
  labelOk,
  isCloseAfterOk,
  handleOk,
}) => {
  const [content, setContent] = useState(comment ? comment.content : "");
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      isCloseAfterOk={isCloseAfterOk}
      handleOk={() => {
        handleOk({ content });
      }}
    >
      <textarea
        style={{ width: "100%", border: "1px solid #000", borderRadius: "2px" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập phản hồi của bạn"
        rows={5}
      ></textarea>
    </Modal>
  );
};
export default ModalReply;
