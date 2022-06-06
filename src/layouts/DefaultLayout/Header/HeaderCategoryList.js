import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { configAxiosResponse } from "../../../config/configAxios";
import { API_GENDER_URL } from "../../../constants";
import { getAllGenderCategories } from "../../../redux/genderCategorySlice";
const HeaderCategoryList = () => {
  const genderCategories = useSelector((state) => state.genderCategory.all);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(`${API_GENDER_URL}`);
      dispatch(getAllGenderCategories(data));
    })();
  }, [dispatch]);

  return (
    <ul className="header-category-list">
      {genderCategories.map((genderCategory) => {
        return (
          <li className="header-category-list-item" key={genderCategory.slug}>
            <Link
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
              className="header-category-list-item-link"
              to={`/${genderCategory.slug}`}
            >
              {genderCategory.name}
            </Link>
            <Box className="header-category-list-notify">
              <Container>
                <Grid container>
                  {genderCategory.group_categories.map((groupCategory) => {
                    return (
                      <Grid item sm={3} key={groupCategory.slug}>
                        <Link
                          to={`/${groupCategory.slug}`}
                          className="header-category-list-notify-group-link"
                        >
                          {
                            groupCategory.name
                              .toLowerCase()
                              .split(genderCategory.name.toLowerCase())[0]
                          }
                        </Link>
                        <ul className="header-category-list-notify-links">
                          {groupCategory.categories.map((category) => {
                            return (
                              <li key={category.slug}>
                                <Link
                                  to={`/${category.slug}`}
                                  className="header-category-list-notify-link"
                                >
                                  {
                                    category.name
                                      .toLowerCase()
                                      .split(
                                        genderCategory.name.toLowerCase()
                                      )[0]
                                  }
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            </Box>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(HeaderCategoryList);
