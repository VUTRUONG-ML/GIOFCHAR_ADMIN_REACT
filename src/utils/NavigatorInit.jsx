import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { setNavigator } from "./navigationService";

export default function NavigatorInit() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigator(navigate);
    console.log("Đã khởi tạo navigator");
  }, [navigate]);
  return <Outlet />;
}
