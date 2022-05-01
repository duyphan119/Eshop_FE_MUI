import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiGetAllGenderCategories } from "../api/apiGenderCategory";
import "./styles/header_category_list.css";
import { Box, Container, Grid } from "@mui/material";
const HeaderCategoryList = () => {
  const genderCategories = useSelector((state) => state.genderCategory.list);
  const dispatch = useDispatch();
  useEffect(() => {
    apiGetAllGenderCategories(dispatch);
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
              {genderCategory.short_name}
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
                          {groupCategory.short_name}
                        </Link>
                        <ul className="header-category-list-notify-links">
                          {groupCategory.categories.map((category) => {
                            return (
                              <li key={category.slug}>
                                <Link
                                  to={`/${category.slug}`}
                                  className="header-category-list-notify-link"
                                >
                                  {category.short_name}
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

export default HeaderCategoryList;
