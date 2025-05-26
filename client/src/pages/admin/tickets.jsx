import { Plus } from "lucide-react";
import { useState } from "react";
import TicketApproval from "./tickets/ticketApproval";
import TicketApprovaled from "./tickets/ticketApprovaled";
import TicketBorrow from "./tickets/ticketBorrow";
import TicketReturn from "./tickets/ticketReturn";
import TicketCancel from "./tickets/ticketCancel";
import ModalAddTicket from "../../components/modalAddTicket";

export default function Tickets() {
  const [selectedStatus, setSelectedStatus] = useState("chờ duyệt");

  const renderComponent = () => {
    switch (selectedStatus) {
      case "chờ duyệt":
        return <TicketApproval />;
      case "đã được duyệt":
        return <TicketApprovaled />;
      case "đang mượn":
        return <TicketBorrow />;
      case "đã trả":
        return <TicketReturn />;
      case "đã huỷ":
        return <TicketCancel />;
      default:
        return null;
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Danh sách Phiếu</h1>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex row">
          <input
            placeholder="Tìm kiếm phiếu..."
            className="w-[170px] input input-bordered"
          />
          <div className="flex row ms-5">
            <span className="flex items-center me-2">Trạng thái:</span>
            <select
              className="select w-35"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option selected>chờ duyệt</option>
              <option>đã được duyệt</option>
              <option>đang mượn</option>
              <option>đã trả</option>
              <option>đã huỷ</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_ticket_modal").showModal()
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Tạo Phiếu
        </button>
      </div>

      {renderComponent()}
      <dialog id="add_ticket_modal" className="modal">
        <ModalAddTicket />
      </dialog>
    </div>
  );
}
