import { useEffect } from "react";
import { useState } from "react";
import ticketApi from "../../../api/ticket.api";
import DetailTicket from "../../../components/detailTicket";
import { useSearchParams } from "react-router-dom";

export default function TicketReturn() {
  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const handleOpenDetailTicket = (ticket) => {
    setSelectedTicket(ticket);
    document.getElementById("detail_modal").showModal();
  };

  const fetchTickets = async () => {
    try {
      const res = await ticketApi.getAllTicketByStatus("đã trả", page);
      setTickets(res.data.tickets);
      setTotalPage(res.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  return (
    <div className="w-full">
      {tickets.length !== 0 ? (
        <>
          <div className="overflow-x-auto border rounded-sm">
            <table className="table min-w-max">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>ID</th>
                  <th>tên</th>
                  <th>email</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket._id.slice(0, 6)}...</td>
                    <td>{ticket.userId.username}</td>
                    <td>{ticket.userId.email}</td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className="badge badge-outline badge-primary">
                        {ticket.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-info btn-sm"
                        onClick={() => handleOpenDetailTicket(ticket)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <div className="join">
              {/* Previous button */}
              <button
                className="join-item btn btn-square"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                &lt;
              </button>

              {/* Page numbers */}
              {Array.from({ length: 5 }, (_, i) => {
                let start = Math.max(1, page - 2);
                let end = Math.min(totalPage, start + 4);
                start = Math.max(1, end - 4); // đảm bảo hiển thị 5 số

                const currentPage = start + i;
                if (currentPage > totalPage) return null;

                return (
                  <input
                    key={currentPage}
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label={currentPage.toString()}
                    checked={page === currentPage}
                    onChange={() => handlePageChange(currentPage)}
                  />
                );
              })}

              {/* Next button */}
              <button
                className="join-item btn btn-square"
                disabled={page === totalPage}
                onClick={() => handlePageChange(page + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center mt-5">Không có phiếu nào</p>
      )}
      <dialog id="detail_modal" className="modal">
        {selectedTicket && <DetailTicket ticket={selectedTicket} />}
      </dialog>
    </div>
  );
}
