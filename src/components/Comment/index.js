import { Box, FormControl, TextField, Typography } from "@mui/material";
import Stars from "../Stars";
import "moment/locale/vi";
import { useState } from "react";
import RepliedComment from "../RepliedComment";
import { useDispatch, useSelector } from "react-redux";
import { fromNow } from "../../utils";
import { configAxiosAll } from "../../config/configAxios";
import { API_REPLIED_COMMENT_URL } from "../../constants";

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
    const data = await configAxiosAll(user, dispatch).post(
      `${API_REPLIED_COMMENT_URL}`,
      req_replied_comment
    );
    console.log(data);
  };

  return (
    <Box fullWidth id={`comment${comment.id}`} className="comment">
      <Box display="flex" mt={1}>
        {/* <Box sx={{ width: 60 }}>
          <Avatar
            alt="avatar"
            src={comment.user?.avatar}
            sx={{ width: 48, height: 48 }}
            variant="square"
          />
        </Box> */}
        <Box flex={1}>
          <Box display="flex" alignItems="center">
            <Typography fontSize={16} mr={1}>
              {comment.user && comment.user.full_name}
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
                {fromNow(comment.createdAt)}
              </Typography>
              <Typography ml={1} fontSize={12} color="gray">
                {comment.createdAt !== comment.updatedAt ? "Đã chỉnh sửa" : ""}
              </Typography>
            </Box>
            {comment.replied_comments &&
              comment.replied_comments.map((item) => {
                return (
                  <RepliedComment
                    comment={item}
                    key={item.id + Math.random()}
                  />
                );
              })}
            {showReplyForm && (
              <Box display="flex" mt={1} width="100%">
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name="relied_comment"
                      id="relied_comment"
                      defaultValue={""}
                      placeholder="Nhập phản hồi của bạn"
                    />
                  </FormControl>
                </form>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
