import Ticket from "../models/ticket.model.js";

export const getTicketByUserIdService = async (userId) => {
  return await Ticket.find({ userId }).populate("books.bookId");
};

export const getTicketByStatusService = async (userId, status) => {
  return await Ticket.find({ userId, status }).populate("books.bookId");
};
//6.7 lưu phiếu mượn vào cơ sở dữ liệu qua phương thức creatTicketService() từ TicketService
export const createTicketService = async (userId, ticketBody) => {
  return await Ticket.create({ userId, ...ticketBody });
};

export const setStatusTicketService = async (ticketId, status) => {
  return await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });
};

export const deleteTicketService = async (ticketId) => {
  return await Ticket.findByIdAndDelete(ticketId);
};

export const getAllTicketByStatusService = async (
  page = 1,
  limit = 8,
  status
) => {
  const skip = (page - 1) * limit;
  const tickets = await Ticket.find({ status: status })
    .populate("userId", "username email")
    .populate("books.bookId")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Ticket.countDocuments({ status: status });

  return { tickets, total };
};
export const getTotalTicketsService = async () => {
  const total = await Ticket.estimatedDocumentCount();

  return total;
};
