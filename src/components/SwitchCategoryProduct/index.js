import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductGender from "../../pages/ProductGender";
import ProductsCategory from "../../pages/ProductCategory";
const SwitchCategoryProduct = () => {
  const { category_slug } = useParams();
  const genderCategories = useSelector((state) => state.genderCategory.all);

  function switchPages() {
    for (const genderCategory of genderCategories) {
      if (genderCategory.slug === category_slug) {
        return <ProductGender genderCategory={genderCategory} />;
      }
      for (const groupCategory of genderCategory.group_categories) {
        if (groupCategory.slug === category_slug) {
          return (
            <ProductsCategory
              genderCategory={genderCategory}
              groupCategory={groupCategory}
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
              />
            );
          }
        }
      }
    }
    return <ProductsCategory />;
  }

  return <div>{switchPages()}</div>;
};

export default SwitchCategoryProduct;
