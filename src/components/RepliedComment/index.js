import { Box, Typography } from "@mui/material";
import { fromNow } from "../../utils";

const RepliedComment = ({ comment }) => {
  return (
    <Box display="flex" mt={1} marginLeft="60px">
      <Box flex={1}>
        <Box display="flex" alignItems="center">
          <Typography fontSize={16} mr={1}>
            {comment.user?.full_name}
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
          <Typography fontSize={12}>{fromNow(comment.createdAt)}</Typography>
          <Typography ml={1} fontSize={12} color="gray">
            {comment.createdAt !== comment.updatedAt ? "Đã chỉnh sửa" : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RepliedComment;
