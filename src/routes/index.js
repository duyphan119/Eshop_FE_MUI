// import Home from "../components/Dashboard/Home/Home";
import SwitchCategoryProduct from "../components/SwitchCategoryProduct";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductSearchResult from "../pages/ProductSearchResult";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import Dashboard from "../pages/Dashboard";
import ProductManagement from "../pages/ProductManagement";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import AccountInfo from "../pages/AccountInfo";
import ClientOrders from "../pages/ClientOrders";
import Favorite from "../pages/Favorite";
import Latest from "../pages/Latest";
import { AccountLayout, ContentLayout, DashboardLayout } from "../layouts";
import OrderManagement from "../pages/OrderManagement";
import UserManagement from "../pages/UserManagement";
import CommentManagement from "../pages/CommentManagement";
import Statistics from "../pages/Statistcs";
import CategoryManagement from "../pages/CategoryManagement";
import BannerManagement from "../pages/BannerManagement";
import config from "../config";
import ChangePassword from "../pages/ChangePassword";
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
    layout: ContentLayout,
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
    path: config.routes.account,
    component: AccountInfo,
    layout: AccountLayout,
  },
  {
    path: config.routes.accountOrder,
    component: ClientOrders,
    layout: AccountLayout,
  },
  {
    path: config.routes.accountLatest,
    component: Latest,
    layout: AccountLayout,
  },
  {
    path: config.routes.accountFavorite,
    component: Favorite,
    layout: AccountLayout,
  },
  {
    path: config.routes.changePassword,
    component: ChangePassword,
    layout: AccountLayout,
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
    path: config.routes.orderManagement,
    component: OrderManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.userManagement,
    component: UserManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.commentManagement,
    component: CommentManagement,
    layout: DashboardLayout,
  },
  {
    path: config.routes.statistics,
    component: Statistics,
    layout: DashboardLayout,
  },
  {
    path: config.routes.bannerManagement,
    component: BannerManagement,
    layout: DashboardLayout,
  },
];