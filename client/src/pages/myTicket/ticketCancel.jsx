import { useEffect } from "react";
import { useState } from "react";
import ticketApi from "../../api/ticket.api";
import DetailTicket from "../../components/detailTicket";
import { toast } from "react-toastify";

export default function TicketCancel() {
  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleOpenDetailTicket = (ticket) => {
    setSelectedTicket(ticket);
    document.getElementById("detail_modal").showModal();
  };

  const fetchTickets = async () => {
    try {
      const res = await ticketApi.getTicketByStatus("đã huỷ");
      setTickets(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUndoTicket = async (ticketId) => {
    try {
      const res = await ticketApi.setTicketStatus(ticketId, "chờ duyệt");

      if (res) {
        fetchTickets();
        toast.success("hoàn tác phiếu thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const res = await ticketApi.deleteTicket(ticketId);
      if (res) {
        fetchTickets();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Danh sách phiếu Đã huỷ</h2>

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
                  <th>Hoàn tác</th>
                  <th>xoá</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket._id.slice(0, 3)}...</td>
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
                    <td>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleUndoTicket(ticket._id)}
                      >
                        Hoàn tác
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleDeleteTicket(ticket._id)}
                      >
                        Xoá
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
