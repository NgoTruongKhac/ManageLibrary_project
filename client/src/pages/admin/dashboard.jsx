import { useEffect } from "react";
import apiBook from "../../api/book.api";
import apiUser from "../../api/user.api";
import ticketApi from "../../api/ticket.api";
import { useState } from "react";
import { User, BookOpen, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const bookRes = await apiBook.getTotalBooks();
        const userRes = await apiUser.getTotalUsers();
        const ticketRes = await ticketApi.getTotalTickets();

        setTotalBooks(bookRes.data.totalBooks);
        setTotalUsers(userRes.data.totalUsers);
        setTotalTickets(ticketRes.data.totalTickets);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const Card = ({ title, count, icon: Icon, link }) => (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border">
      <Icon className="w-10 h-10 text-blue-600 mb-3" />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
      <Link to={link} className="mt-3 text-sm text-blue-500 hover:underline">
        Xem chi tiết
      </Link>
    </div>
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Tổng tài khoản"
          count={totalUsers}
          icon={User}
          link="/admin/user"
        />
        <Card
          title="Tổng Sách"
          count={totalBooks}
          icon={BookOpen}
          link="/admin/book"
        />
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
