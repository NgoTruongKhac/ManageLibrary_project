import { NavLink, Link } from "react-router-dom";
import { ChartColumnBig, Users, BookCopy, ClipboardList } from "lucide-react";
import logo from "../../assets/logo.png";
export default function Sidebar() {
  const navItems = [
    {
      to: "/admin/dashboard",
      label: "Thống kê",
      icon: <ChartColumnBig size={19} />,
    },
    {
      to: "/admin/user?page=1",
      label: "Tài khoản",
      icon: <Users size={19} />,
    },
    {
      to: "/admin/book?page=1",
      label: "Sách",
      icon: <BookCopy size={19} />,
    },
    {
      to: "/admin/ticket?page=1",
      label: "Phiếu",
      icon: <ClipboardList size={19} />,
    },
  ];
  return (
    <aside
      className={`fixed flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen  z-50 border-r border-gray-200`}
    >
      <div className="mb-7 mt-3">
        <Link to={"/"}>
          <img
            className="w-[130px] flex justify-items-center"
            src={logo}
            alt=""
          />
        </Link>
      </div>
      <ul className="space-y-2">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition 
                   ${
                     isActive
                       ? "bg-blue-100 text-blue-600"
                       : "hover:bg-gray-200"
                   }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
