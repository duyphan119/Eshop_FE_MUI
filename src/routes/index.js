import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
const CartPage = React.lazy(() => import("../pages/cartpage/CartPage"));
const HomePage = React.lazy(() => import("../pages/homepage/HomePage"));
const LoginPage = React.lazy(() => import("../pages/login-register/LoginPage"));
const RegisterPage = React.lazy(() =>
  import("../pages/login-register/RegisterPage")
);
const NotFoundPage = React.lazy(() =>
  import("../pages/notfoundpage/NotFoundPage")
);
const OAuthPage = React.lazy(() => import("../pages/oauthpage/OAuthPage"));
const OrdersPage = React.lazy(() => import("../pages/orderspage/OrdersPage"));
const PaymentPage = React.lazy(() =>
  import("../pages/paymentpage/PaymentPage")
);
const PersonalInfoPage = React.lazy(() =>
  import("../pages/personalinfopage/PersonalInfoPage")
);
const ProductFormPage = React.lazy(() =>
  import("../pages/productformpage/ProductFormPage")
);
const ProductSearchPage = React.lazy(() =>
  import("../pages/productsearchpage/ProductSearchPage")
);
const ProductsOfBuyerTypePage = React.lazy(() =>
  import("../pages/productsofbuyertypepage/ProductsOfBuyerTypePage")
);
const WishListPage = React.lazy(() =>
  import("../pages/wishlistpage/WishListPage")
);
const ProductsPage = React.lazy(() =>
  import("../pages/productspage/ProductsPage")
);
const ProductPage = React.lazy(() =>
  import("../pages/productpage/ProductPage")
);
const routes = (genderCategories, collectionProducts) => {
  const showRouteCategory = () => {
    let arr = [];
    genderCategories.forEach((genderCategory) => {
      arr.push(
        <Route
          key={genderCategory.slug}
          path={`/${genderCategory.slug}`}
          element={
            <ProductsOfBuyerTypePage
              genderCategory={genderCategory}
              buyerType={genderCategory}
            />
          }
        />
      );
      genderCategory.Group_Categories.forEach((groupCategory) => {
        arr.push(
          <Route
            key={groupCategory.slug}
            path={`/${groupCategory.slug}`}
            element={<ProductsPage groupCategory={groupCategory} />}
          />
        );
        groupCategory.Categories.forEach((category) => {
          arr.push(
            <Route
              key={category.slug}
              path={`/${category.slug}`}
              element={<ProductsPage category={category} />}
            />
          );
        });
      });
    });
    return arr;
  };

  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/oauth/success" element={<OAuthPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      {showRouteCategory()}
      {collectionProducts.map((item) => {
        return (
          <Route
            path={`/${item.slug}`}
            key={item.id}
            element={<ProductsPage collectionProduct={item} />}
          />
        );
      })}
      <Route path="/search" element={<ProductSearchPage />} />
      <Route path="/account" element={<PersonalInfoPage />} />
      <Route path="/product/add" element={<ProductFormPage />} />
      <Route path="/:productSlug" element={<ProductPage />} />
      <Route path="/wishlist" element={<WishListPage />} />
    </Routes>
  );
};

export default routes;
