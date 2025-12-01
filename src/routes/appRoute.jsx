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
export const router = createBrowserRouter([
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
        path: "my",
        Component: MyAccount,
        handle: { title: "Thông tin tài khoản" },
      },
    ],
  },
]);
