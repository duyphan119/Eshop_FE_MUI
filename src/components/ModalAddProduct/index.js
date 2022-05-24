import Modal from "../Modal";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import ModalSelectDetail from "../ModalSelectDetail";
import ModalSelectMaterial from "../ModalSelectMaterial";
import ModalSelectImage from "../ModalSelectImage";
const ModalAddProduct = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  product,
  handleOk,
  width,
}) => {
  const categories = useSelector((state) => state.category.all);

  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [indexCategory, setIndexCategory] = useState(
    categories.length > 0 ? 0 : -1
  );
  const [openDetail, setOpenDetail] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [price, setPrice] = useState(product ? product.price : "");
  const [details, setDetails] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [images, setImages] = useState([]);

  function getDetail(detail) {
    const _details = [...details];

    const index = _details.findIndex(
      (d) => d.color.id === detail.color.id && d.size.id === detail.size.id
    );

    if (index === -1) {
      _details.push(detail);
    } else {
      _details[index] = detail;
    }

    setDetails(_details);
  }

  function getMaterial(material) {
    const _materials = [...materials];

    const index = _materials.findIndex((m) => m.id === material.id);

    if (index === -1) {
      _materials.push(material);
    } else {
      _materials[index] = material;
    }

    setMaterials(_materials);
  }
  function getImage(image) {
    const _images = [...images];

    const index = _images.findIndex((img) => img.color.id === image.color.id);

    if (index === -1) {
      _images.push(image);
    } else {
      _images[index] = image;
    }

    setImages(_images);
  }

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={title}
        labelOk={labelOk}
        handleOk={() => {
          handleOk({
            name,
            price,
            description,
            category: categories[indexCategory],
            details,
            materials,
            images,
          });
        }}
        isCloseAfterOk={isCloseAfterOk}
        width={width}
      >
        <Grid container rowSpacing={2} columnSpacing={2} my={1}>
          <Grid item xs={5}>
            {categories.length > 0 && (
              <FormControl sx={{ marginBottom: "8px" }} fullWidth>
                <InputLabel id="category">Danh mục</InputLabel>
                <Select
                  label="Danh mục"
                  labelId="category"
                  value={indexCategory}
                  onChange={(e) => setIndexCategory(e.target.value)}
                >
                  {categories.map((item, index) => (
                    <MenuItem value={index} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl sx={{ marginBottom: "8px" }} fullWidth>
              <TextField
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "8px" }} fullWidth>
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="Giá"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </FormControl>
            <Box sx={{ marginBottom: "8px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenDetail(true)}
              >
                Chọn chi tiết sản phẩm
              </Button>
            </Box>
            <Box sx={{ marginBottom: details.length > 0 ? "6px" : "8px" }}>
              {details.map((item, index) => (
                <Chip
                  sx={{
                    marginLeft: index === 0 ? "0" : "2px",
                    marginBottom: "2px",
                  }}
                  key={index}
                  size="small"
                  label={`${item.color.value} - ${item.size.value} - ${item.amount}`}
                  variant="outlined"
                  onDelete={() =>
                    setDetails(
                      [...details].filter(
                        (el) =>
                          el.color.id !== item.color.id ||
                          el.size.id !== item.size.id
                      )
                    )
                  }
                />
              ))}
            </Box>
            <Box sx={{ marginBottom: "8px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenMaterial(true)}
              >
                Chọn chất liệu sản phẩm
              </Button>
            </Box>
            <Box sx={{ marginBottom: materials.length > 0 ? "6px" : "8px" }}>
              {materials.map((item, index) => (
                <Chip
                  sx={{
                    marginLeft: index === 0 ? "0" : "2px",
                    marginBottom: "2px",
                  }}
                  key={index}
                  size="small"
                  label={item.value}
                  variant="outlined"
                  onDelete={() =>
                    setMaterials(
                      [...materials].filter((el) => el.id !== item.id)
                    )
                  }
                />
              ))}
            </Box>
            <Box sx={{ marginBottom: "8px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenImage(true)}
              >
                Chọn hình ảnh
              </Button>
            </Box>
            <Box sx={{ marginBottom: images.length > 0 ? "6px" : "8px" }}>
              {images.map((item, index) => (
                <Chip
                  sx={{
                    marginLeft: index === 0 ? "0" : "2px",
                    marginBottom: "2px",
                  }}
                  key={index}
                  size="small"
                  label={`${item.color.value} - ${item.files.length}`}
                  variant="outlined"
                  onDelete={() =>
                    setImages(
                      [...images].filter((el) => el.color.id !== item.color.id)
                    )
                  }
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Editor
              onInit={(evt, editor) => {}}
              initialValue="<p></p>"
              apiKey="indwv4av23yq82wi3287w99kyjhpog9esio9z4tzzabp86w1"
              onEditorChange={(text, editor) => {
                setDescription(text);
              }}
              init={{
                height: 300,
                apiKey: "indwv4av23yq82wi3287w99kyjhpog9esio9z4tzzabp86w1",
                menubar: false,
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
              }}
            />
          </Grid>
        </Grid>
      </Modal>
      {openDetail && (
        <ModalSelectDetail
          open={openDetail}
          handleClose={() => setOpenDetail(false)}
          labelOk="Thêm"
          title="Thêm chi tiết sản phẩm"
          isCloseAfterOk={false}
          handleOk={getDetail}
        />
      )}
      {openMaterial && (
        <ModalSelectMaterial
          open={openMaterial}
          handleClose={() => setOpenMaterial(false)}
          labelOk="Thêm"
          title="Thêm chất liệu sản phẩm"
          isCloseAfterOk={false}
          handleOk={getMaterial}
          width={400}
        />
      )}
      {openImage && (
        <ModalSelectImage
          open={openImage}
          handleClose={() => setOpenImage(false)}
          labelOk="Thêm"
          title="Thêm hình ảnh sản phẩm"
          isCloseAfterOk={false}
          handleOk={getImage}
          width={600}
        />
      )}
    </>
  );
};

export default ModalAddProduct;
