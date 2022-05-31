import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import ConfirmDialog from "../../components/ConfirmDialog";
import ModalComment from "../../components/ModalComment";
import Stars from "../../components/Stars";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_COMMENT_URL,
  API_REPLIED_COMMENT_URL,
  LIMIT_ROW_COMMENT,
} from "../../constants";
import {
  deleteComment,
  deleteRepliedComment,
  getComment,
  newRepliedComment,
  updateComment,
  updateRepliedComment,
} from "../../redux/commentSlice";
import { fromNow } from "../../utils";
import "./CommentManagement.css";
import { Paper, Tooltip } from "@mui/material";
import ModalReply from "../../components/ModalReply";
const CommentManagement = () => {
  const comment = useSelector((state) => state.comment.comment);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  console.log(comment);

  useEffect(() => {
    configAxiosAll(user, dispatch)
      .get(`${API_COMMENT_URL}`, { params: { limit: LIMIT_ROW_COMMENT } })
      .then((data) => {
        dispatch(getComment(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user]);

  if (!comment) return "";

  return (
    <Paper sx={{ p: 1 }}>
      <Comments items={comment.items} />
    </Paper>
  );
};

const Comments = ({ items }) => {
  return (
    <div
      className="custom-scrollbar"
      style={{ overflowY: "overlay", maxHeight: 600 }}
    >
      {items.map((item, index) => (
        <Comment key={index} item={item} />
      ))}
    </div>
  );
};

const Comment = ({ item }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [showRepliedComments, setShowRepliedComments] = useState(true);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  async function handleOk(data) {
    const { content } = data;
    try {
      const res = await configAxiosAll(user, dispatch).post(
        `${API_REPLIED_COMMENT_URL}`,
        {
          comment_id: item.id,
          content,
          user_id: user.id,
        }
      );
      dispatch(newRepliedComment({ ...res, user }));
      if (!showRepliedComments) setShowRepliedComments(true);
    } catch (error) {}
  }

  async function handleUpdateComment(data) {
    const { content, rate } = data;
    try {
      const res = await configAxiosAll(user, dispatch).put(
        `${API_COMMENT_URL}`,
        {
          id: item.id,
          rate,
          content,
        }
      );
      dispatch(updateComment(res));
    } catch (error) {}
  }

  async function handleDelete() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_COMMENT_URL}/${item.id}`
      );
      dispatch(deleteComment(item.id));
    } catch (error) {}
  }
  return (
    <div>
      <div className="row-comment">
        <div className="">
          <div
            className=""
            style={{ color: "gray", display: "flex", alignItems: "center" }}
          >
            {/* Name, time, ... */}
            {item.user.full_name} • <Stars fontSize="16px" rate={item.rate} />{" "}
            •&nbsp;
            {fromNow(item.createdAt)}
            {item.createdAt === item.updatedAt ? "" : ` • Đã chỉnh sửa`}
          </div>
          <div
            className="three-dot three-dot-4"
            style={{ fontWeight: "500", marginBlock: 4 }}
          >
            {/* Content */}
            {item.content}
          </div>
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            {/* Actions */}
            <div
              className="hover-color-main-color comment-action"
              onClick={() => setOpen(true)}
            >
              Phản hồi
            </div>
            {/* Replied Comments */}
            <div
              style={{
                cursor:
                  item.replied_comments.length === 0 ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                userSelect: "none",
                width: "100px",
              }}
              onClick={() => {
                setShowRepliedComments(
                  item.replied_comments.length > 0 && !showRepliedComments
                );
              }}
            >
              {item.replied_comments.length} phản hồi{" "}
              {item.replied_comments.length > 0 ? (
                showRepliedComments ? (
                  <KeyboardArrowUpIcon sx={{ fontSize: 12 }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
                )
              ) : (
                ""
              )}
            </div>
            <div
              className="hover-color-main-color comment-action"
              onClick={() => setOpenModal(true)}
            >
              Sửa
            </div>
            <div
              className="hover-color-main-color comment-action"
              onClick={() => setShowDialog(true)}
            >
              Xoá
            </div>
          </div>
        </div>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: 50,
          }}
        >
          {/* Product */}
          <img
            src={
              item.product &&
              item.product.images.length > 0 &&
              item.product.images[0].url
            }
            alt=""
            style={{ height: 52 }}
          />
          <div
            className="three-dot three-dot-2"
            style={{ width: "140px", marginLeft: 2 }}
          >
            {item.product && item.product.name}
          </div>
          {/* Icon View Detail */}
          <Link
            className="view-link hover-color-main-color"
            to={`/product/${item.product && item.product.slug}`}
          >
            <Tooltip title="Xem chi tiết sản phẩm">
              <OpenInNewIcon />
            </Tooltip>
          </Link>
        </div>
      </div>
      {showRepliedComments && (
        <ul>
          {item.replied_comments.map((subItem, subIndex) => (
            <RepliedComments key={subIndex} comment={item} item={subItem} />
          ))}
        </ul>
      )}
      {open && (
        <ModalReply
          open={open}
          handleClose={() => setOpen(false)}
          title="Phản hồi bình luận"
          labelOk="Gửi"
          handleOk={handleOk}
          isCloseAfterOk={true}
        />
      )}
      {openModal && (
        <ModalComment
          open={openModal}
          handleClose={() => setOpenModal(false)}
          comment={item}
          labelOk="Sửa"
          title="Chỉnh sửa bình luận"
          handleOk={handleUpdateComment}
          isCloseAfterOk={true}
        />
      )}
      {showDialog && (
        <ConfirmDialog
          open={showDialog}
          title="Xác nhận"
          text={`Bạn có chắc chắn muốn xoá bình luận "${
            item.content.length > 10
              ? item.content.substring(0, 10) + "..."
              : item.content
          }" này không?`}
          onConfirm={handleDelete}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

const RepliedComments = ({ item, comment }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  async function handleUpdateRepliedComment(data) {
    const { content } = data;
    try {
      const res = await configAxiosAll(user, dispatch).put(
        `${API_REPLIED_COMMENT_URL}`,
        {
          id: item.id,
          content,
        }
      );
      dispatch(updateRepliedComment(res));
    } catch (error) {}
  }

  async function handleDelete() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_REPLIED_COMMENT_URL}/${item.id}`
      );
      dispatch(deleteRepliedComment({ id: item.id, commentId: comment.id }));
    } catch (error) {}
  }

  return (
    <li className="row-replied-comment">
      <div className="" style={{ color: "gray" }}>
        {/* Name, time */}
        {item.user.full_name} •&nbsp;{fromNow(item.createdAt)}
        {item.createdAt === item.updatedAt ? "" : ` • Đã chỉnh sửa`}
      </div>
      <div className="three-dot three-dot-4">{item.content}</div>
      <div className="" style={{ display: "flex", alignItems: "center" }}>
        {/* Actions */}

        <div
          className="hover-color-main-color comment-action"
          onClick={() => setOpenModal(true)}
        >
          Sửa
        </div>
        <div
          className="hover-color-main-color comment-action"
          onClick={() => setShowDialog(true)}
        >
          Xoá
        </div>
      </div>
      <Link
        className="view-link hover-color-main-color"
        to={`/product/${comment.product && comment.product.slug}`}
      >
        <Tooltip title="Xem chi tiết sản phẩm">
          <OpenInNewIcon />
        </Tooltip>
      </Link>
      {openModal && (
        <ModalReply
          open={openModal}
          handleClose={() => setOpenModal(false)}
          comment={item}
          labelOk="Sửa"
          title="Chỉnh sửa bình luận"
          handleOk={handleUpdateRepliedComment}
          isCloseAfterOk={true}
        />
      )}
      {showDialog && (
        <ConfirmDialog
          open={showDialog}
          title="Xác nhận"
          text={`Bạn có chắc chắn muốn xoá bình luận "${
            item.content.length > 10
              ? item.content.substring(0, 10) + "..."
              : item.content
          }" này không?`}
          onConfirm={handleDelete}
          onClose={() => setShowDialog(false)}
        />
      )}
    </li>
  );
};

export default CommentManagement;
