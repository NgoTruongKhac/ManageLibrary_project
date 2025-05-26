import { useEffect } from "react";
import { useState } from "react";
import ticketApi from "../../../api/ticket.api";
import DetailTicket from "../../../components/detailTicket";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function TicketApproval() {
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
      const res = await ticketApi.getAllTicketByStatus("chờ duyệt", page);
      setTickets(res.data.tickets);
      setTotalPage(res.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const handleApproval = (ticketId) => {
    Swal.fire({
      text: "Xác nhận duyệt phiếu này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "duyệt",
      cancelButtonText: "Không",
      width: "370px",
      customClass: {
        icon: "w-2 h-2",
        text: "text-lg font-medium",
        confirmButton: "btn btn-ouline btn-success mr-3",
        cancelButton: "btn btn-ouline btn-error ml-3",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // xử lý duyệt phiếu ở đây
        try {
          const res = await ticketApi.setTicketStatus(ticketId, "đã duyệt");
          if (res) {
            fetchTickets();
            toast.success("duyệt phiếu thành công");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Người dùng đã chọn 'Không'");
      }
    });
  };

  const handleCanelTicket = (ticketId) => {
    //   const res = await ticketApi.setTicketStatus(ticketId, "đã huỷ");

    Swal.fire({
      text: "Xác nhận huỷ phiếu này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "huỷ",
      cancelButtonText: "Không",
      width: "370px",
      customClass: {
        icon: "w-2 h-2",
        text: "text-lg font-medium",
        confirmButton: "btn btn-ouline btn-success mr-3",
        cancelButton: "btn btn-ouline btn-error ml-3",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // xử lý duyệt phiếu ở đây
        try {
          const res = await ticketApi.setTicketStatus(ticketId, "đã huỷ");
          if (res) {
            fetchTickets();
            toast.success("huỷ phiếu thành công");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Người dùng đã chọn 'Không'");
      }
    });
  };

  return (
    <div className="w-full">
      {tickets.length !== 0 ? (
        <>
          {" "}
          <div className="overflow-x-auto border rounded-sm">
            <table className="table w-full">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>ID</th>
                  <th>tên</th>
                  <th>email</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                  <th>Duyệt</th>
                  <th>Huỷ</th>
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
                    <td>
                      <button
                        className="btn btn-outline btn-success btn-sm"
                        onClick={() => handleApproval(ticket._id)}
                      >
                        Duyệt
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleCanelTicket(ticket._id)}
                      >
                        Huỷ
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
