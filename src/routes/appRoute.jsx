import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import Products from "../pages/products/Products";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Users from "../pages/users/Users";
import Categories from "../pages/Categories/Categories";
import MyAccount from "../pages/MyAccount";
import Login from "../features/login/Login";
import OrderDetail from "../pages/orders/OrderDetail";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import CreateProduct from "../pages/products/CreateProduct";
import UpdateProduct from "../pages/products/UpdateProduct";
import NavigatorInit from "../utils/NavigatorInit";
import Promotions from "../pages/promotion/Promotions";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigatorInit />,
    children: [
      {
        path: "/auth",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: Dashboard },
          {
            path: "products",
            Component: Products,
            handle: { title: "Quản lý sản phẩm" },
          },
          {
            path: "products/create",
            Component: CreateProduct,
            handle: { title: "Thêm sản phẩm" },
          },
          {
            path: "products/update/:foodId",
            Component: UpdateProduct,
            handle: { title: "Chỉnh sửa thông tin sản phẩm" },
          },
          {
            path: "orders",
            Component: Orders,
            handle: { title: "Quản lý đơn hàng" },
          },
          {
            path: "orders/:orderId",
            Component: OrderDetail,
            handle: { title: "Chi tiết đơn hàng" },
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
            path: "promotions",
            Component: Promotions,
            handle: { title: "Quản lý khuyến mãi" },
          },
          {
            path: "my",
            Component: MyAccount,
            handle: { title: "Thông tin tài khoản" },
          },
        ],
      },
    ],
  },
]);
