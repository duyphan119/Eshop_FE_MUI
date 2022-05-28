import { Stack, Pagination } from "@mui/material";

const _Pagination = ({ onChange, page, totalPage }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        color="primary"
        page={page > 0 ? page : 1}
        onChange={onChange}
      />
    </Stack>
  );
};

export default _Pagination;
