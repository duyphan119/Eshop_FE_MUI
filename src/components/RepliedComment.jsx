import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";

const RepliedComment = ({ comment }) => {
  return (
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
        <Box display="flex">
          <Typography fontSize={12}>
            {moment(comment.createdAt).fromNow()}
          </Typography>
          <Typography ml={1} fontSize={12} color="gray">
            {comment.createdAt !== comment.updatedAt ? "Đã chỉnh sửa" : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RepliedComment;
