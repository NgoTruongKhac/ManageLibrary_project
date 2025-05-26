import { useEffect } from "react";
import { useState } from "react";
import ticketApi from "../../api/ticket.api";
import DetailTicket from "../../components/detailTicket";

export default function TicketApprovaled() {
  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleOpenDetailTicket = (ticket) => {
    setSelectedTicket(ticket);
    document.getElementById("detail_modal").showModal();
  };

  const fetchTickets = async () => {
    try {
      const res = await ticketApi.getTicketByStatus("được duyệt");
      setTickets(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Danh sách phiếu đã duyệt</h2>

      {tickets.length !== 0 ? (
        <>
          <div className="overflow-x-auto border rounded-md">
            <table className="table w-full">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>ID</th>
                  <th>Ngày tạo</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket._id.slice(0, 6)}...</td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(ticket.borrowDate).toLocaleDateString()}</td>
                    <td>{new Date(ticket.returnDate).toLocaleDateString()}</td>
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
          <dialog id="detail_modal" className="modal">
            {selectedTicket && <DetailTicket ticket={selectedTicket} />}
          </dialog>
        </>
      ) : (
        <p className="text-center mt-5">Không có phiếu nào</p>
      )}
    </div>
  );
}
