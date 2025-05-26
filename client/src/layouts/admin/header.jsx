import { useUser } from "../../contexts/user.context";
import { Bell, UserPen, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useUser();

  const handleLogOut = async () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-base-100 shadow-sm z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 px-6 flex justify-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="input input-bordered  max-w-md"
          />
        </div>

        {/* Right: Thông báo + Avatar */}
        <div className="flex items-center gap-4">
          {/* Search (hiển thị lại trên mobile) */}
          <div className="block md:hidden">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="input input-bordered w-24"
            />
          </div>

          {/* Bell icon */}
          <div className="relative cursor-pointer">
            <Bell className="w-6 h-6 text-gray-600 hover:text-black" />
            {/* Badge nếu có */}
            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span> */}
          </div>

          {/* Avatar Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="avatar" src={user.avatar} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 shadow"
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserPen size={18} />
                    Tài khoản
                  </Link>
                </li>
                <li>
                  <a className="flex items-center gap-2">
                    <Settings size={18} />
                    Cài đặt
                  </a>
                </li>
                <li>
                  <a onClick={handleLogOut} className="flex items-center gap-2">
                    <LogOut size={18} />
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
