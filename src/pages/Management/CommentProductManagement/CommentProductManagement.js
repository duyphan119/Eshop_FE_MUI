import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Avatar, Box, Button, IconButton, Paper, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Stars from "../../../components/Stars";
import { axiosRes } from "../../../config/configAxios";
import {
  API_COLOR_URL,
  API_COMMENT_PRODUCT_URL,
  LIMIT_ROW_COMMENT_PRODUCT,
} from "../../../constants";

import {
  addCommentProduct,
  getAllCommentProducts,
  getCurrentCommentProduct,
  updateCommentProduct,
} from "../../../redux/commentProductSlice";
import { showToast } from "../../../redux/toastSlice";
import { calHeightDataGrid, formatDateTimeVN, getURL } from "../../../utils";
const CommentProductManagement = () => {
  const commentProducts = useSelector((state) => state.commentProduct.list);
  const current = useSelector((state) => state.commentProduct.current);
  const dispatch = useDispatch();

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const promises = [];
    promises.push(axiosRes().get(`${API_COMMENT_PRODUCT_URL}`));
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllCommentProducts(listRes[0].value.items));
        }
      })
      .catch((err) => {});
  }, [dispatch]);

  async function handleOk(data) {
    try {
      if (!current) {
        const res = await axiosRes().post(`${API_COLOR_URL}`, data);
        dispatch(addCommentProduct({ ...data, ...res.item }));
        dispatch(
          showToast({
            isOpen: true,
            text: "Thêm thành công",
            type: "success",
          })
        );
      } else {
        await axiosRes().put(`${API_COLOR_URL}/${current.id}`, data);
        dispatch(updateCommentProduct({ ...current, ...data }));
      }
    } catch (error) {}
  }

  return (
    <>
      <Box bgcolor="#fff" p={1}>
        <Box m={1}>
          {commentProducts.map((item, index) => (
            <Paper key={index} my={1}>
              <Box
                display="flex"
                justifyContent="space-between"
                fontSize={14}
                p={1}
              >
                <Box display="flex">
                  <Box>
                    <Avatar
                      src={getURL(item.user.avatar)}
                      alt={item.user.fullName}
                    />
                  </Box>
                  <Box ml={1}>
                    <Box>
                      {item.user.fullName} - {formatDateTimeVN(item.createdAt)}
                    </Box>
                    <Box>
                      <Stars rate={item.rate} fontSize={14} />
                    </Box>
                    <Box fontSize={12}>{item.content}</Box>
                    <Box fontSize={12} display="flex">
                      <Box sx={{ textDecoration: "underline" }}>Sửa</Box>
                      <Box
                        ml={2}
                        color="red"
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        Xoá
                      </Box>
                      <Box sx={{ textDecoration: "underline" }} ml={2}>
                        Trả lời
                      </Box>
                      <Box
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        sx={{ textDecoration: "underline" }}
                        ml={2}
                      >
                        Phản hồi ({item?.repComments?.length})
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <img alt="" src={getURL(item.product.avatar)} height="50" />
                  <Box mx={1}>{item.product.name}</Box>
                  <Tooltip title="Đến trang chi tiết sản phẩm">
                    <Link to={`/${item.product.slug}`}>
                      <IconButton size="small">
                        <OpenInNewIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Box>
              </Box>
              {item.repComments.map((element, i) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize={14}
                  p={1}
                  pl={7}
                >
                  <Box display="flex">
                    <Box>
                      <Avatar
                        src={element.user.avatar}
                        alt={element.user.fullName}
                      />
                    </Box>
                    <Box ml={1}>
                      <Box>
                        {element.user.fullName} -{" "}
                        {formatDateTimeVN(element.createdAt)}
                      </Box>
                      <Box>
                        <Stars rate={element.rate} fontSize={14} />
                      </Box>
                      <Box fontSize={12}>{element.content}</Box>
                      <Box fontSize={12} display="flex">
                        <Box sx={{ textDecoration: "underline" }}>Sửa</Box>
                        <Box
                          ml={2}
                          color="red"
                          sx={{ textDecoration: "underline" }}
                        >
                          Xoá
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          ))}
        </Box>
      </Box>
      {/* {openModal && (
        <ModalSize
          width={360}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleOk={handleOk}
          labelOk={current ? "Sửa" : "Thêm"}
          title={current ? "Sửa đánh giá" : "Thêm đánh giá"}
          isCloseAfterOk={current !== null}
        />
      )}
    */}
    </>
  );
};

export default CommentProductManagement;
