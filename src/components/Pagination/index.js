import { Box, Pagination } from "@mui/material";
const _Pagination = ({
  onChange,
  page,
  totalPage,
  listRowPerPage,
  rowsPerPage,
  onChangeRowsPerPage,
  showRowsPerPage,
}) => {
  return (
    <Box spacing={2}>
      <div style={{ position: "relative" }}>
        {(showRowsPerPage || totalPage > 1) && (
          <Pagination
            count={totalPage}
            color="primary"
            page={page > 0 ? page : 1}
            onChange={onChange}
          />
        )}
        {showRowsPerPage && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: -200,
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: 4 }}>Số hàng mỗi trang: </div>
            <select
              value={rowsPerPage}
              onChange={(e) => onChangeRowsPerPage(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: "inherit" }}
            >
              {listRowPerPage.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </Box>
  );
};

export default _Pagination;
