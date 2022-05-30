import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductGender from "../../pages/ProductGender";
import ProductsCategory from "../../pages/ProductCategory";
import { API_PRODUCT_URL } from "../../constants";
const SwitchCategoryProduct = () => {
  const { category_slug } = useParams();
  const genderCategories = useSelector((state) => state.genderCategory.all);

  function switchPages() {
    for (const genderCategory of genderCategories) {
      if (genderCategory.slug === category_slug) {
        return <ProductGender genderCategory={genderCategory} />;
      } else if (`thoi-trang-${genderCategory.slug}` === category_slug) {
        return (
          <ProductsCategory
            query={`${API_PRODUCT_URL}/gender/${genderCategory.slug}`}
            genderCategory={genderCategory}
            title={`Thời trang ${genderCategory.name.toLowerCase()}`}
          />
        );
      }
      for (const groupCategory of genderCategory.group_categories) {
        if (groupCategory.slug === category_slug) {
          return (
            <ProductsCategory
              genderCategory={genderCategory}
              groupCategory={groupCategory}
              query={`${API_PRODUCT_URL}/group-category/${groupCategory.slug}`}
              title={`${groupCategory.name}`}
            />
          );
        }
        for (const category of groupCategory.categories) {
          if (category.slug === category_slug) {
            return (
              <ProductsCategory
                genderCategory={genderCategory}
                category={category}
                groupCategory={groupCategory}
                query={`${API_PRODUCT_URL}/category/${category.slug}`}
                title={`${category.name}`}
              />
            );
          }
        }
      }
    }
    if (category_slug === "all") {
      return (
        <ProductsCategory
          query={`${API_PRODUCT_URL}`}
          title="Tất cả sản phẩm"
        />
      );
    }
    return "";
  }

  return <div>{switchPages()}</div>;
};

export default SwitchCategoryProduct;
