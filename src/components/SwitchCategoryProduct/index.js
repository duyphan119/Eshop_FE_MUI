import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_PRODUCT_URL } from "../../constants";
import ProductsCategory from "../../pages/ProductCategory";
import ProductDetail from "../../pages/ProductDetail";
import ProductGender from "../../pages/ProductGender";
import BannerSlider from "../BannerSlider";
import banner1 from "../../assets/imgs/banner/banner-1.jpg";
import banner2 from "../../assets/imgs/banner/banner-2.jpg";
import banner3 from "../../assets/imgs/banner/banner-3.jpg";
import banner4 from "../../assets/imgs/banner/banner-4.jpg";
import banner5 from "../../assets/imgs/banner/banner-5.jpg";
const SwitchCategoryProduct = () => {
  const { category_slug } = useParams();
  const groupCategories = useSelector((state) => state.groupCategory.all);

  const switchPages = useMemo(() => {
    for (const groupCategory of groupCategories) {
      if (groupCategory.slug === category_slug) {
        return (
          <ProductsCategory
            groupCategory={groupCategory}
            query={`${API_PRODUCT_URL}/group-category/slug/${groupCategory.slug}`}
            title={`${groupCategory.name.toUpperCase()}`}
          />
        );
      }
    }

    return <ProductDetail query={`${API_PRODUCT_URL}/slug/${category_slug}`} />;

    // for (const genderCategory of groupCategories) {
    //   if (genderCategory.slug === category_slug) {
    //     return <ProductGender genderCategory={genderCategory} />;
    //   } else if (`thoi-trang-${genderCategory.slug}` === category_slug) {
    //     return (
    //       <ProductsCategory
    //         query={`${API_PRODUCT_URL}/gender/${genderCategory.slug}`}
    //         genderCategory={genderCategory}
    //         title={`Thời trang ${genderCategory.name.toLowerCase()}`}
    //       />
    //     );
    //   }
    //   for (const groupCategory of genderCategory.group_categories) {
    //     if (groupCategory.slug === category_slug) {
    //       return (
    //         <ProductsCategory
    //           genderCategory={genderCategory}
    //           groupCategory={groupCategory}
    //           query={`${API_PRODUCT_URL}/group-category/${groupCategory.slug}`}
    //           title={`${groupCategory.name}`}
    //         />
    //       );
    //     }
    //     for (const category of groupCategory.categories) {
    //       if (category.slug === category_slug) {
    //         return (
    //           <ProductsCategory
    //             genderCategory={genderCategory}
    //             category={category}
    //             groupCategory={groupCategory}
    //             query={`${API_PRODUCT_URL}/category/${category.slug}`}
    //             title={`${category.name}`}
    //           />
    //         );
    //       }
    //     }
    //   }
    // }
    // if (category_slug === "all") {
    //   return (
    //     <ProductsCategory
    //       query={`${API_PRODUCT_URL}`}
    //       title="Tất cả sản phẩm"
    //     />
    //   );
    // } else {
    //   if (groupCategories.length > 0) {
    //     return (
    //       <ProductDetail query={`${API_PRODUCT_URL}/slug/${category_slug}`} />
    //     );
    //   } else {
    //     return "";
    //   }
    // }
  }, [category_slug, groupCategories]);

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
      {switchPages}
    </>
  );
};

export default SwitchCategoryProduct;
