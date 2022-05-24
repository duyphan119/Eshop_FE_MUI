import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "../Comment";
import { SocketContext } from "../../context";
import { API_COMMENT_URL, LIMIT_COMMENT } from "../../constants";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import ModalComment from "../ModalComment";
import { isShowCollapse, isShowLoadMore } from "../Button";

const Comments = ({ product }) => {
  const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [comment, setComment] = useState();
  const [limit, setLimit] = useState(LIMIT_COMMENT);
  const [myComment, setMyComment] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (item) => {
      setComment((prev) => addComment(prev, { ...item, user }));
    };
    socket.on("receive-message", handler);
    return () => socket.off("receive-message", handler);
  }, [socket, dispatch, user]);

  useEffect(() => {
    (async function () {
      try {
        const data1 = await configAxiosResponse().get(
          `${API_COMMENT_URL}/product/${product.id}?limit=${limit}`
        );
        setComment(data1);
        const data2 = await configAxiosResponse().get(
          `${API_COMMENT_URL}/user/${user.id}/product/${product.id}`
        );
        setMyComment(data2);
      } catch (error) {}
    })();
  }, [dispatch, limit, user, product.id]);

  function addComment(prev, newComment) {
    const _comment = { ...prev };
    if (
      _comment.items.findIndex(
        (item) =>
          item.user_id === newComment.user_id &&
          item.product_id === newComment.product_id
      ) === -1
    ) {
      _comment.items = [newComment, ..._comment.items];
      _comment.total_result++;
      _comment.total_page = Math.ceil(_comment.total_result / LIMIT_COMMENT);
    }
    return _comment;
  }

  function updateComment(prev, newComment) {
    const _comment = { ...prev };
    const index = _comment.items.findIndex(
      (item) =>
        item.user_id === newComment.user_id &&
        item.product_id === newComment.product_id
    );
    if (index !== -1) {
      _comment.items[index] = newComment;
    }
    return _comment;
  }

  function handleOk(rate, content) {
    const reqComment = {
      rate,
      content,
      user_id: user.id,
      product_id: product.id,
    };
    if (myComment) {
      // Sửa comment
      configAxiosAll(user, dispatch)
        .put(`${API_COMMENT_URL}`, { ...reqComment, id: myComment.id })
        .then((data) => {
          setMyComment(data);
          setComment((prev) => updateComment(prev, data));
        })
        .catch((err) => {});
    } else {
      // Thêm comment
      configAxiosAll(user, dispatch)
        .post(`${API_COMMENT_URL}`, reqComment)
        .then((data) => {
          console.log(data);
          setMyComment(data);
          setComment((prev) => addComment(prev, data));
        })
        .catch((err) => {});
    }
    socket.emit("send-message", {
      ...reqComment,
      roomId: product.slug,
    });
    socket.emit("send-notify", {
      ...reqComment,
      roomId: "admin",
    });
  }
  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   socket.emit("join-room", product.id);
  // }, [socket, product.id]);

  // useEffect(() => {
  //   socket.on("receive-message", (message) => {
  //     dispatch(newComment(message));
  //   });
  // }, [socket, dispatch, product.comments]);

  if (!user)
    return (
      <Box fullWidth display="flex" alignItems="center" flexDirection="column">
        <Box mt={1}>Đăng nhập để bình luận</Box>
        <Box mt={1} mb={1}>
          <Button variant="contained">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Đăng nhập
            </Link>
          </Button>
        </Box>
      </Box>
    );
  return (
    <Box>
      {/* {user && user.role && user.role.role === "user" && (
        <div className="my-2 text-center">
          <Button variant="contained">
            {myComment ? "Thay đổi đánh giá của bạn" : "Viết đánh giá của bạn"}
          </Button>
        </div>
      )} */}
      <Typography variant="h4" mt={1}>
        Đánh giá
      </Typography>
      <Box fullWidth textAlign="center" mt={2}>
        <Button variant="contained" onClick={() => setOpen(!open)}>
          {myComment ? "Sửa đánh giá của bạn" : "Viết đánh giá của bạn"}
        </Button>
      </Box>
      {/* <RenderComments product={product} /> */}
      {/* <Box fullWidth textAlign="center" mt={2}>
        <Button variant="contained">Xem thêm</Button>
      </Box> */}
      {myComment && <Comment comment={myComment} />}
      {comment &&
        comment.items &&
        comment.items.map((item, index) =>
          myComment && item.id === myComment.id ? (
            ""
          ) : (
            <Comment comment={item} key={index} />
          )
        )}
      <Box display="flex" justifyContent="center">
        {isShowLoadMore(comment, LIMIT_COMMENT, () =>
          setLimit(limit + LIMIT_COMMENT)
        )}
        {isShowCollapse(comment, LIMIT_COMMENT, () => setLimit(LIMIT_COMMENT))}
      </Box>
      {open && (
        <ModalComment
          open={open}
          handleClose={() => setOpen(false)}
          labelOk={myComment ? "Sửa" : "Gửi"}
          isCloseAfterOk={true}
          title={myComment ? "Sửa đánh giá của bạn" : "Viết đánh giá của bạn"}
          comment={myComment}
          handleOk={handleOk}
        />
      )}
    </Box>
  );
};

// const RenderComments = memo(({ product }) => {
//   return (
//     <>
//       {product?.comments?.map((item) => {
//         return <Comment comment={item} key={item.id + Math.random()} />;
//       })}
//     </>
//   );
// });

export default Comments;
