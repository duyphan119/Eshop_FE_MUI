import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonLink,
  isShowCollapse,
  isShowLoadMore,
} from "../../components/Button";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/Skeleton/Product";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_PRODUCT_URL,
  LIMIT_BEST_SELLER,
  LIMIT_NEW_PRODUCT,
} from "../../constants";
import BannerSlider from "../../components/BannerSlider";
import banner1 from "../../assets/imgs/banner/banner-1.jpg";
import banner2 from "../../assets/imgs/banner/banner-2.jpg";
import banner3 from "../../assets/imgs/banner/banner-3.jpg";
import banner4 from "../../assets/imgs/banner/banner-4.jpg";
import banner5 from "../../assets/imgs/banner/banner-5.jpg";
import do_nu_img from "../../assets/imgs/home/do-nu.jpg";
import do_nam_img from "../../assets/imgs/home/do-nam.jpg";
import ao_khoac_img from "../../assets/imgs/home/ao-khoac.jpg";
import backpack_img from "../../assets/imgs/home/backpack.jpg";
import slingbag_img from "../../assets/imgs/home/slingbag.jpg";
import cap_img from "../../assets/imgs/home/cap.jpg";
import belt_img from "../../assets/imgs/home/belt.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [bestSellerProduct, setBestSellerProduct] = useState();
  const [newestProduct, setNewestProduct] = useState();

  const [limit, setLimit] = useState(LIMIT_BEST_SELLER);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const promises = [];
        // promises.push(
        //   configAxiosAll(user, dispatch).get(
        //     `${API_PRODUCT_URL}?type=best-seller&limit=${limit}`
        //   )
        // );
        promises.push(
          configAxiosAll(user, dispatch).get(
            `${API_PRODUCT_URL}?limit=${LIMIT_NEW_PRODUCT}`
          )
        );

        const listRes = await Promise.allSettled(promises);
        console.log(listRes);
        if (listRes[0].status === "fulfilled") {
          setNewestProduct(listRes[0].value);
        }
        // if (listRes[0].status === "fulfilled") {
        //   setBestSellerProduct(listRes[0].value);
        // }
        // if (listRes[1].status === "fulfilled") {
        //   setNewestProduct(listRes[1].value);
        // }
      } catch (error) {}
    })();
  }, [user, dispatch, limit]);
  return (
    <>
      <BannerSlider
        banners={[
          { url: banner1, href: "/" },
          { url: banner2, href: "/" },
          { url: banner3, href: "/" },
          { url: banner4, href: "/" },
          { url: banner5, href: "/" },
        ]}
      ></BannerSlider>
      <Grid container spacing={3}>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{
            my: 3,
          }}
        >
          <Link to="/">
            <img src={do_nu_img} width="100%" alt="" />
          </Link>
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{
            my: 3,
          }}
        >
          <Link to="/">
            <img src={do_nam_img} width="100%" alt="" />
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Link to="/">
            <img src={ao_khoac_img} width="100%" alt="" />
          </Link>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={6} xs={12}>
              <Link to="/">
                <img src={backpack_img} width="100%" alt="" />
              </Link>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Link to="/">
                <img src={slingbag_img} width="100%" alt="" />
              </Link>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Link to="/">
                <img src={cap_img} width="100%" alt="" />
              </Link>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Link to="/">
                <img src={belt_img} width="100%" alt="" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid
          item
          md={12}
          sx={{
            textAlign: "center",
            marginBlock: "5px",
          }}
        >
          <Typography variant="h6" textTransform="uppercase" color="#000">
            Mới nhất
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} px={4}>
        {newestProduct?.items?.length > 0 &&
          newestProduct?.items?.map((product) => {
            return (
              <Grid key={product.slug} item xs={6} sm={4} md={3}>
                <Product product={product} />
              </Grid>
            );
          })}
      </Grid>
      <Box sx={{ textAlign: "center" }} my={1}>
        <ButtonLink link={`/all`} label="Xem thêm" />
      </Box>
    </>
  );
};

export default Home;
