const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  cart: "/cart",
  checkout: "/checkout",
  checkoutSuccess: "/checkout/success",
  productDetail: "/product/:product_slug",
  account: "/account",
  accountOrder: "/account/order",
  accountLatest: "/account/latest",
  accountFavorite: "/account/favorite",
  dashboard: "/dashboard",
  orderManagement: "/dashboard/order",
  commentManagement: "/dashboard/comment",
  categoryManagement: "/dashboard/category",
  productManagement: "/dashboard/product",
  userManagement: "/dashboard/user",
  bannerManagement: "/dashboard/banner",
  statistics: "/dashboard/statistics",
  productCategory: "/:category_slug",
  search: "/search",
  changePassword: "/account/change-password",
};

export default routes;