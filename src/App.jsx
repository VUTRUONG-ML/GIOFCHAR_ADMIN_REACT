import { Routes, Route } from "react-router";
import "./App.css";
import AdminDraft from "./screens/AdminDraft";
import LoginDraft from "./screens/login/LoginDraft";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="categories" element={<Categories />} />
        <Route path="my" element={<MyAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
