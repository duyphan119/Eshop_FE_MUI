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
// import DashBoardPage from "../pages/DashBoard/DashBoardPage";

// const index = (user, genderCategories, products) => {
//   // console.log(genderCategories);
//   const showRoutes = () => {
//     let arr = [];
//     // genderCategories.forEach((genderCategory) => {
//     //   arr.push(
//     //     <Route
//     //       key={genderCategory.slug}
//     //       path={`/${genderCategory.slug}`}
//     //       element={<ProductGenderPage genderCategory={genderCategory} />}
//     //     />
//     //   );
//     //   genderCategory.group_categories.forEach((groupCategory) => {
//     //     arr.push(
//     //       <Route
//     //         key={groupCategory.slug}
//     //         path={`/${groupCategory.slug}`}
//     //         element={<ProductsCategoryPage groupCategory={groupCategory} />}
//     //       />
//     //     );
//     //     groupCategory.categories.forEach((category) => {
//     //       arr.push(
//     //         <Route
//     //           key={category.slug}
//     //           path={`/${category.slug}`}
//     //           element={<ProductsCategoryPage category={category} />}
//     //         />
//     //       );
//     //     });
//     //   });
//     // });
//     genderCategories.forEach((genderCategory) => {
//       arr.push({
//         path: `/${genderCategory.slug}`,
//         element: <ProductGenderPage genderCategory={genderCategory} />,
//       });
//       genderCategory.group_categories.forEach((groupCategory) => {
//         arr.push({
//           path: `/group/${groupCategory.slug}`,
//           element: <ProductsCategoryPage groupCategory={groupCategory} />,
//         });
//         groupCategory.categories.forEach((category) => {
//           arr.push({
//             path: `/category/${category.slug}`,
//             element: <ProductsCategoryPage category={category} />,
//           });
//         });
//       });
//     });
//     arr.push(<Route path="*" key={Math.random()} element={<NotFoundPage />} />);
//     return arr.map((item) => (
//       <Route path={item.path} element={item.element} key={Math.random()} />
//     ));
//   };
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />

//       <Route path="/search" element={<ProductSearchPage />} />

//       <Route path="/product/add" element={<AddProductFormPage />} />

//       <Route path="/cart" element={<CartPage />} />

//       <Route path="/oauth/success" element={<OAuthPage />} />

//       {user && (
//         <>
//           <Route path="/account" element={<AccountPage />} />
//           <Route path="/orders" element={<OrdersManagement />} />

//           <Route path="/favorite" element={<FavoriteListPage />} />

//           <Route path="/checkout" element={<CheckOutPage />} />

//           <Route path="/checkout/success" element={<CheckOutSuccessPage />} />

//           {user && user.role && user.role.role === "admin" && (
//             <>
//               <Route path="/dashboard" element={<Home />} />
//               <Route path="/dashboard/orders" element={<Orders />} />

//               <Route path="/dashboard/products" element={<Products />} />
//               <Route
//                 path="/dashboard/products/add"
//                 element={<AddProductForm />}
//               />
//             </>
//           )}
//         </>
//       )}

//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/product/:product_slug" element={<ProductDetailPage />} />
//       {showRoutes()}
//     </Routes>
//   );
// };

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
    path: "/dashboard/product",
    component: ProductManagement,
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
