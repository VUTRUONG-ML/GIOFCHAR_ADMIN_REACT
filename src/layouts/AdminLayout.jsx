import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 pb-5">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <Header />
        {/* Content */}
        <div className=" mt-22 ml-70 mr-3 flex flex-col min-h-[calc(95vh-80px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
