import { Outlet, useMatches } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const matches = useMatches();
  const currentTitle = matches[matches.length - 1].handle?.title;
  const title = currentTitle ?? "Tổng quan";
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#E8F5E8] via-[#F1F8E9] to-[#E8F5E8]">
      <Sidebar />
      <div className="flex-1 ml-70 flex flex-col pr-6">
        <Header title={title} />
        {/* Content */}
        <div className="pt-20  flex-1 flex flex-col pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
