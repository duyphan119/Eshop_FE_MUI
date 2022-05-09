import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import ProductsCategoryPage from "../pages/ProductsCategoryPage";
import ProductGenderPage from "../pages/ProductGenderPage";
import ProductSearchPage from "../pages/ProductSearchPage";
import CheckOutPage from "../pages/CheckOutPage";
import AccountPage from "../pages/AccountPage";
import FavoriteListPage from "../pages/FavoriteListPage";
import AddProductFormPage from "../pages/AddProductFormPage";
import NotFoundPage from "../pages/NotFoundPage";
import CheckOutSuccessPage from "../pages/CheckOutSuccessPage";
import OAuthPage from "../pages/OAuthPage";
import OrdersManagement from "../pages/OrdersManagement";
import Home from "../components/Dashboard/Home/Home";
import Orders from "../components/Dashboard/Home/Orders";
import Products from "../components/Dashboard/Product/Products";
import AddProductForm from "../components/Dashboard/Product/AddProductForm";
// import DashBoardPage from "../pages/DashBoard/DashBoardPage";

const index = (user, genderCategories) => {
  console.log(genderCategories);
  const showRoutes = () => {
    let arr = [];
    // genderCategories.forEach((genderCategory) => {
    //   arr.push(
    //     <Route
    //       key={genderCategory.slug}
    //       path={`/${genderCategory.slug}`}
    //       element={<ProductGenderPage genderCategory={genderCategory} />}
    //     />
    //   );
    //   genderCategory.group_categories.forEach((groupCategory) => {
    //     arr.push(
    //       <Route
    //         key={groupCategory.slug}
    //         path={`/${groupCategory.slug}`}
    //         element={<ProductsCategoryPage groupCategory={groupCategory} />}
    //       />
    //     );
    //     groupCategory.categories.forEach((category) => {
    //       arr.push(
    //         <Route
    //           key={category.slug}
    //           path={`/${category.slug}`}
    //           element={<ProductsCategoryPage category={category} />}
    //         />
    //       );
    //     });
    //   });
    // });
    genderCategories.forEach((genderCategory) => {
      arr.push({
        path: `/${genderCategory.slug}`,
        element: <ProductGenderPage genderCategory={genderCategory} />,
      });
      genderCategory.group_categories.forEach((groupCategory) => {
        arr.push({
          path: `/${groupCategory.slug}`,
          element: <ProductsCategoryPage groupCategory={groupCategory} />,
        });
        groupCategory.categories.forEach((category) => {
          arr.push({
            path: `/${category.slug}`,
            element: <ProductsCategoryPage category={category} />,
          });
        });
      });
    });
    return arr.map((item) => (
      <Route path={item.path} element={item.element} key={item.path} />
    ));
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {genderCategories.length > 0 && showRoutes()}

      <Route path="/search" element={<ProductSearchPage />} />

      {genderCategories.length > 0 && (
        <Route path="/:product_slug" element={<ProductDetailPage />} />
      )}

      <Route path="/product/add" element={<AddProductFormPage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/oauth/success" element={<OAuthPage />} />

      {user && (
        <>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders" element={<OrdersManagement />} />

          <Route path="/favorite" element={<FavoriteListPage />} />

          <Route path="/checkout" element={<CheckOutPage />} />

          <Route path="/checkout/success" element={<CheckOutSuccessPage />} />

          {user.role.role === "admin" && (
            <>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/dashboard/orders" element={<Orders />} />

              <Route path="/dashboard/products" element={<Products />} />
              <Route
                path="/dashboard/products/add"
                element={<AddProductForm />}
              />
            </>
          )}
        </>
      )}

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default index;
