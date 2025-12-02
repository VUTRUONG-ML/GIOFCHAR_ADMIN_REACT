import { Outlet, useMatches } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const matches = useMatches();
  const currentTitle = matches[matches.length - 1].handle?.title;
  const title = currentTitle ?? "Tổng quan";
  return (
    <div className="flex min-h-screen bg-gray-100 pb-5 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col pr-6">
        <Header title={title} />
        {/* Content */}
        <div className=" mt-24 ml-70 mr-3 flex-1 flex flex-col ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
