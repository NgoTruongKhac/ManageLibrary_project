import Header from "../../layouts/admin/header";
import Sidebar from "../../layouts/admin/sidebar";
import { Outlet } from "react-router-dom";

export default function AppAdmin() {
  return (
    <>
      <Header />
      <Sidebar />

      <main className="ml-44 mt-2 p-4 rounded-md">
        {" "}
        {/* margin để không bị che bởi sidebar và header */}
        <Outlet />
      </main>
    </>
  );
}
