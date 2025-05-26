import Header from "./header";
import Footer from "./footer";
import Breadcrumb from "./breadcrumb";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="mt-2 mb-2 flex justify-center">
        <Breadcrumb />
      </div>
      <div className="flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
