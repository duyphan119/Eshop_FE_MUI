import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import {
  memo,
  // useContext, useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiAddNewComment, apiUpdateComment } from "../api/apiComment";
// import { SocketContext } from "../context";
import { newComment, updateComment } from "../redux/productSlice";
import Comment from "./Comment";
import Stars from "./Stars";

const Comments = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const product = useSelector((state) => state.product.current);

  const dispatch = useDispatch();

  const isCommented = (() => {
    if (user) {
      const existingComment = product.comments.find(
        (item) => item.user_id === user.id
      );
      if (existingComment) {
        return existingComment;
      }
    }
    return false;
  })();

  const [rate, setRate] = useState(isCommented ? isCommented.rate : 0);

  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   socket.emit("join-room", product.id);
  // }, [socket, product.id]);

  // useEffect(() => {
  //   socket.on("receive-message", (message) => {
  //     dispatch(newComment(message));
  //   });
  // }, [socket, dispatch, product.comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const _newComment = {
      user_id: user.id,
      product_id: product.id,
      reply_to: null,
      content: formData.get("comment"),
      rate: rate,
    };
    if (isCommented) {
      _newComment.id = isCommented.id;
      const data = await apiUpdateComment(user, _newComment, dispatch);
      dispatch(updateComment(data));
    } else {
      const data = await apiAddNewComment(user, _newComment, dispatch);
      dispatch(newComment(data));
      // socket.emit("send-message", {
      //   roomId: product.id,
      //   ...data,
      // });
    }
  };
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
      <Typography variant="h4" mt={1}>
        Bình luận
      </Typography>
      <Box mt={1} mb={3}>
        <form onSubmit={handleSubmit}>
          <Box fullWidth justifyContent="center" display="flex" mt={1}>
            <Stars rate={rate} setRate={setRate} isActive={true} />
          </Box>
          <Box style={{ width: "100%", display: "flex" }}>
            <Box sx={{ width: 60 }}>
              <Avatar
                alt="avatar"
                src={user.avatar}
                sx={{ width: 48, height: 48 }}
                variant="square"
              />
            </Box>
            <Box flex={1}>
              <TextField
                fullWidth
                name="comment"
                id="comment"
                defaultValue={(() => {
                  if (user && product && product.comments) {
                    const _comment = product.comments.find(
                      (item) => item.user_id === user.id
                    );
                    if (_comment) {
                      return _comment.content;
                    }
                  }
                  return "";
                })()}
                placeholder="Nhập bình luận của bạn"
              />
            </Box>
          </Box>
          <Box fullWidth justifyContent="center" display="flex" mt={1}>
            <Button size="small" variant="contained" type="submit">
              {isCommented ? "Chỉnh sửa" : "Bình luận"}
            </Button>
          </Box>
        </form>
      </Box>
      <RenderComments product={product} />
      <Box fullWidth textAlign="center" mt={2}>
        <Button variant="contained">Xem thêm</Button>
      </Box>
    </Box>
  );
};

const RenderComments = memo(({ product }) => {
  return (
    <>
      {product.comments.map((item) => {
        return <Comment comment={item} key={item.id + Math.random()} />;
      })}
    </>
  );
});

export default Comments;
