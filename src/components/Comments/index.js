import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import {
  // memo,
  useContext,
  useEffect,
  // useContext, useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { apiAddNewComment, apiUpdateComment } from "../../api/apiComment";
// import { SocketContext } from "../context";
// import { newComment, updateComment } from "../../redux/productSlice";
// import Stars from "../Stars";
// import Comment from "../Comment";
import { SocketContext } from "../../context";
import { API_COMMENT_URL, LIMIT_COMMENT } from "../../constants";
import { configAxiosResponse } from "../../config/configAxios";
import ModalComment from "../ModalComment";

const Comments = ({ product }) => {
  const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [comment, setComment] = useState();
  const [limit, setLimit] = useState(LIMIT_COMMENT);
  const [myComment, setMyComment] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("receive-message", (newComment) => {
      setComment((prev) => addComment(prev, newComment));
      // dispatch(addComment(comment));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    (async function () {
      try {
        const data1 = await configAxiosResponse().get(
          `${API_COMMENT_URL}/product/${product.id}?limit=${limit}`
        );
        // dispatch(getAllComments(data.items));
        // setComment(data1);
        const data2 = await configAxiosResponse().get(
          `${API_COMMENT_URL}/user/${user.id}`
        );
        // setMyComment(data2);
      } catch (error) {}
    })();
  }, [dispatch, limit, user, product.id]);

  function addComment(prev, newComment) {
    const _comment = { ...prev };
    if (_comment.items.findIndex((item) => item.id === newComment) === -1) {
      _comment.items = [
        newComment,
        ..._comment.items.splice(_comment.items.length - 1, 1),
      ];
      _comment.total_result++;
      _comment.total_page = Math.ceil(_comment.total_result / LIMIT_COMMENT);
    }
    return _comment;
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
          Viết đánh giá của bạn
        </Button>
      </Box>
      {/* <RenderComments product={product} /> */}
      {/* <Box fullWidth textAlign="center" mt={2}>
        <Button variant="contained">Xem thêm</Button>
      </Box> */}
      <ModalComment open={open} handleClose={() => setOpen(false)} />
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
