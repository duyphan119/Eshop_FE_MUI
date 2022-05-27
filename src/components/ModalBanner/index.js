import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";
const ModalBanner = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  banner,
}) => {
  const [page, setPage] = useState(banner ? banner.page : "/");
  const [href, setHref] = useState(banner ? banner.href : "/");
  const [position, setPosition] = useState(banner ? banner.position : "");
  const [isShow, setIsShow] = useState(banner ? banner.isShow : true);
  const [file, setFile] = useState();
  const [tempUrl, setTempUrl] = useState();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          page,
          href,
          position,
          file,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              required
              label="Liên kết trang"
              helperText="Ví dụ: /, /login, ..."
              value={href}
              onChange={(e) => setHref(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              required
              label="Vị trí"
              helperText="Ví dụ: under header, above header, ..."
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Trang hiển thị"
              helperText="Ví dụ: /, /login"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="show">Hiển thị</InputLabel>
            <Select
              labelId="show"
              label="Hiển thị"
              value={isShow}
              onChange={(e) => setIsShow(e.target.value)}
            >
              <MenuItem value={true}>Hiển thị</MenuItem>
              <MenuItem value={false}>Không hiển thị</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            id="banner"
            hidden
            onChange={(e) => {
              setFile(e.target.files[0]);
              setTempUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <label htmlFor="banner">
            <div
              className=""
              style={{
                width: "100%",
                height: 200,
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundImage: `url(${
                  file ? tempUrl : banner ? banner.url : ""
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              {file ? "" : "Tải ảnh lên"}
            </div>
          </label>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalBanner;
