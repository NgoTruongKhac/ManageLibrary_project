// Import các hook và API cần thiết
import { useEffect } from "react";
import apiBook from "../../api/book.api"; // API quản lý sách
import apiUser from "../../api/user.api"; // API quản lý người dùng
import ticketApi from "../../api/ticket.api"; // API quản lý phiếu
import { useState } from "react";
import { User, BookOpen, Ticket } from "lucide-react"; // Import icon
import { Link } from "react-router-dom"; // Import Link để điều hướng

// Dashboard - Thống kê thông tin cho Admin
export default function Dashboard() {
  // Khai báo state để lưu tổng số sách, người dùng, phiếu
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  // useEffect dùng để gọi API lấy dữ liệu tổng số từ server khi component được mount
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        // Gọi API để lấy tổng số sách
        const bookRes = await apiBook.getTotalBooks();

        // Gọi API để lấy tổng số người dùng
        const userRes = await apiUser.getTotalUsers();

        // Gọi API để lấy tổng số phiếu
        const ticketRes = await ticketApi.getTotalTickets();

        // Cập nhật state với dữ liệu từ API
        setTotalBooks(bookRes.data.totalBooks);
        setTotalUsers(userRes.data.totalUsers);
        setTotalTickets(ticketRes.data.totalTickets);
      } catch (error) {
        // Xử lý lỗi nếu API gặp vấn đề
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals(); // Gọi hàm lấy dữ liệu
  }, []);

  // Component Card hiển thị từng thông tin thống kê
  // eslint-disable-next-line no-unused-vars
  const Card = ({ title, count, icon: Icon, link }) => (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border">
      {/* Hiển thị icon */}
      <Icon className="w-10 h-10 text-blue-600 mb-3" />

      {/* Hiển thị tiêu đề */}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>

      {/* Hiển thị số lượng */}
      <p className="text-2xl font-bold text-gray-800">{count}</p>

      {/* Link điều hướng đến trang chi tiết */}
      <Link to={link} className="mt-3 text-sm text-blue-500 hover:underline">
        Xem chi tiết
      </Link>
    </div>
  );

  return (
    <div className="p-6">
      {/* Hiển thị các Card thống kê theo dạng grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Thống kê tổng tài khoản */}
        <Card
          title="Tổng tài khoản"
          count={totalUsers}
          icon={User}
          link="/admin/user"
        />

        {/* Thống kê tổng sách */}
        <Card
          title="Tổng Sách"
          count={totalBooks}
          icon={BookOpen}
          link="/admin/book"
        />

        {/* Thống kê tổng phiếu */}
        <Card
          title="Tổng phiếu"
          count={totalTickets}
          icon={Ticket}
          link="/admin/ticket"
        />
      </div>
    </div>
  );
}
