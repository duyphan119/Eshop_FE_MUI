// import Home from "../components/Dashboard/Home/Home";
import SwitchCategoryProduct from "../components/SwitchCategoryProduct";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductSearchResult from "../pages/ProductSearchResult";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import ProductManagement from "../pages/ProductManagement";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import AccountInfo from "../pages/AccountInfo";
import ClientOrders from "../pages/ClientOrders";
import Favorite from "../pages/Favorite";
import Latest from "../pages/Latest";
import { AccountLayout } from "../components/Layouts";
import OrderManagement from "../pages/OrderManagement";
import UserManagement from "../pages/UserManagement";
import CommentManagement from "../pages/CommentManagement";
import Statistics from "../pages/Statistcs";
import CategoryManagement from "../pages/CategoryManagement";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/search",
    component: ProductSearchResult,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/checkout/success",
    component: CheckoutSuccess,
  },
  {
    path: "/product/:product_slug",
    component: ProductDetail,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/category",
    component: CategoryManagement,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/product",
    component: ProductManagement,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/order",
    component: OrderManagement,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/user",
    component: UserManagement,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/comment",
    component: CommentManagement,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/statistics",
    component: Statistics,
    layout: DashboardLayout,
  },
  {
    path: "/account",
    component: AccountInfo,
    layout: AccountLayout,
  },
  {
    path: "/account/order",
    component: ClientOrders,
    layout: AccountLayout,
  },
  {
    path: "/account/latest",
    component: Latest,
    layout: AccountLayout,
  },
  {
    path: "/account/favorite",
    component: Favorite,
    layout: AccountLayout,
  },
  {
    path: "/:category_slug",
    component: SwitchCategoryProduct,
  },
  {
    path: "*",
    component: NotFound,
  },
];
