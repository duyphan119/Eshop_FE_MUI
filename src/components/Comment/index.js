import { Avatar, Box, TextField, Typography } from "@mui/material";
import Stars from "../Stars";
import moment from "moment";
import "moment/locale/vi";
import { useState } from "react";
import RepliedComment from "../RepliedComment";
import { useDispatch, useSelector } from "react-redux";
import { apiAddNewRepliedComment } from "../../api/apiRepliedComment";
import { newRepliedComment } from "../../redux/productSlice";

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("relied_comment");
    const req_replied_comment = {
      comment_id: comment.id,
      user_id: user.id,
      content: content,
    };
    const data = await apiAddNewRepliedComment(
      user,
      req_replied_comment,
      dispatch
    );
    dispatch(newRepliedComment(data));
  };

  return (
    <Box fullWidth>
      <Box display="flex" mt={1}>
        <Box sx={{ width: 60 }}>
          <Avatar
            alt="avatar"
            src={comment.user?.avatar}
            sx={{ width: 48, height: 48 }}
            variant="square"
          />
        </Box>
        <Box flex={1}>
          <Box display="flex" alignItems="center">
            <Typography fontSize={16} mr={1}>
              {comment.user?.first_name}&nbsp;{comment.user?.last_name}
            </Typography>
            <Stars fontSize="20px" rate={comment.rate} />
          </Box>

          <Box
            fontSize={12}
            fullWidth
            bgcolor="#f1f4f0"
            padding="8px"
            borderRadius="5px"
            marginTop="4px"
          >
            <span className="three-dot three-dot-3">{comment.content}</span>
          </Box>
          <Box>
            <Box display="flex">
              <Typography
                fontSize={12}
                sx={{ cursor: "pointer" }}
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Phản hồi
              </Typography>
              <Typography ml={1} fontSize={12}>
                {moment(comment.createdAt).fromNow()}
              </Typography>
              <Typography ml={1} fontSize={12} color="gray">
                {comment.createdAt !== comment.updatedAt ? "Đã chỉnh sửa" : ""}
              </Typography>
            </Box>
            {comment.replied_comments.map((item) => {
              return (
                <RepliedComment comment={item} key={item.id + Math.random()} />
              );
            })}
            {showReplyForm && (
              <Box display="flex" mt={1}>
                <Box sx={{ width: 60 }}>
                  <Avatar
                    alt="avatar"
                    src={user.avatar}
                    sx={{ width: 48, height: 48 }}
                    variant="square"
                  />
                </Box>
                <Box flex={1}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      name="relied_comment"
                      id="relied_comment"
                      defaultValue={""}
                      placeholder="Nhập phản hồi của bạn"
                    />
                  </form>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
