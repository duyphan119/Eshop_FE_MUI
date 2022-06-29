// import Home from "../components/Dashboard/Home/Home";
import SwitchCategoryProduct from "../components/SwitchCategoryProduct";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductSearchResult from "../pages/ProductSearchResult";
import { Register } from "../pages/Register";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import Dashboard from "../pages/Dashboard";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Profile from "../pages/Profile";
import ClientOrders from "../pages/ClientOrders";
import Favorite from "../pages/Favorite";
import Latest from "../pages/Latest";
import { ContentLayout, DashboardLayout } from "../layouts";

import Statistics from "../pages/Statistics";
import config from "../config";
import ChangePassword from "../pages/ChangePassword";
import {
  GroupCategoryManagement,
  CategoryManagement,
  OrderManagement,
  UserManagement,
  CommentProductManagement,
  ProductManagement,
  ProductDetailManagement,
  ColorManagement,
  SizeManagement,
  RoleManagement,
  CouponManagement,
  DiscountManagement,
  GroupProductManagement,
  ProductImageManagement,
} from "../pages/Management";
import { FormAddUpdateProduct } from "../pages/FormAddUpdateData";
import ProfileEdit from "../pages/ProfileEdit";
export const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.login,
    component: Login,
  },
  {
    path: config.routes.register,
    component: Register,
  },
  {
    path: config.routes.search,
    component: ProductSearchResult,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.checkout,
    component: Checkout,
  },
  {
    path: config.routes.checkoutSuccess,
    component: CheckoutSuccess,
    layout: ContentLayout,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
  },
  {
    path: config.routes.profile,
    component: Profile,
  },
  {
    path: config.routes.profileEdit,
    component: ProfileEdit,
  },
  {
    path: config.routes.profileOrder,
    component: ClientOrders,
  },
  {
    path: config.routes.profileLatest,
    component: Latest,
  },
  {
    path: config.routes.profileFavorite,
    component: Favorite,
  },
  {
    path: config.routes.changePassword,
    component: ChangePassword,
  },
  {
    path: config.routes.productCategory,
    component: SwitchCategoryProduct,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export const adminRoutes = [
  {
    path: config.routes.dashboard,
    component: Dashboard,
    layout: DashboardLayout,
  },
  {
    path: config.routes.categoryManagement,
    component: CategoryManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.productManagement,
    component: ProductManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.productImageManagement,
    component: ProductImageManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.productDetailManagement,
    component: ProductDetailManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.colorManagement,
    component: ColorManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.sizeManagement,
    component: SizeManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.discountManagement,
    component: DiscountManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.orderManagement,
    component: OrderManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.couponManagement,
    component: CouponManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.userManagement,
    component: UserManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.roleManagement,
    component: RoleManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.groupProductManagement,
    component: GroupProductManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.CommentProductManagement,
    component: CommentProductManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.statistics,
    component: Statistics,
    layout: DashboardLayout,
  },
  {
    path: config.routes.groupCategoryManagement,
    component: GroupCategoryManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.productAdd,
    component: FormAddUpdateProduct,
    layout: DashboardLayout,
  },
  {
    path: config.routes.productEdit,
    component: FormAddUpdateProduct,
    layout: DashboardLayout,
  },
];
