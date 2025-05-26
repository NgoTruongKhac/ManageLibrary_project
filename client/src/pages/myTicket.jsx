import {
  ClipboardCheck,
  ClipboardX,
  ClipboardList,
  ClipboardPenLine,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function MyTicket() {
  const navItems = [
    {
      to: "ticket-borrow",
      label: "Phiếu Đang mượn",
      icon: <ClipboardList size={18} />,
    },
    {
      to: "ticket-approval",
      label: "Phiếu Chờ Duyệt",
      icon: <ClipboardPenLine size={18} />,
    },
    {
      to: "ticket-approvaled",
      label: "Phiếu đã duyệt",
      icon: <ClipboardCheck size={18} />,
    },
    {
      to: "ticket-return",
      label: "Phiếu Đã trả",
      icon: <ClipboardCheck size={18} />,
    },
    {
      to: "ticket-cancel",
      label: "Phiếu đã huỷ",
      icon: <ClipboardX size={18} />,
    },
  ];

  return (
    <div className="w-full max-w-[90%] grid grid-cols-8 grid-rows-5 gap-2">
      <aside className="col-span-2 row-span-5 border rounded-md p-4 bg-gray-50">
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

      <main className="col-span-6 row-span-5 col-start-3 h-[500px] border rounded-md p-4 bg-white shadow">
        <Outlet />
      </main>
    </div>
  );
}
