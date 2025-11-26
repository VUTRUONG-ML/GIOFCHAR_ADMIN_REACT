import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories/Categories";
import MyAccount from "./pages/MyAccount";

const router = createBrowserRouter([
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      {
        path: "products",
        Component: Products,
        handle: { title: "Quản lý sản phẩm" },
      },
      {
        path: "orders",
        Component: Orders,
        handle: { title: "Quản lý đơn hàng" },
      },
      {
        path: "users",
        Component: Users,
        handle: { title: "Quản lý khách hàng" },
      },
      {
        path: "categories",
        Component: Categories,
        handle: { title: "Quản lý danh mục" },
      },
      {
        path: "my",
        Component: MyAccount,
        handle: { title: "Thông tin tài khoản" },
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
