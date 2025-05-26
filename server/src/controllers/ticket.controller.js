import {
  getAllTicketByStatusService,
  getTicketByUserIdService,
  getTicketByStatusService,
  createTicketService,
  deleteTicketService,
  setStatusTicketService,
  getTotalTicketsService,
} from "../services/ticket.service.js";
import ErrorHandler from "../middlewares/errors/ErrorHandler.js";

export const getAllTicketByStatus = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const { status } = req.params;
    const { tickets, total } = await getAllTicketByStatusService(
      page,
      limit,
      status
    );
    res.status(200).json({
      tickets,
      total,
      page,
      totalPages: Math.ceil(total / 8),
    });
  } catch (error) {
    next(error);
  }
};

export const getTicketByUserId = async (req, res, next) => {
  try {
    const tickets = await getTicketByUserIdService(req.userId);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicketByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const tickets = await getTicketByStatusService(req.userId, status);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};
//6.6 gọi phương thức createTicket() từ lớp TicketController
export const creatTicket = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new ErrorHandler("Thiếu userId", 400);
    const newTicket = await createTicketService(userId, req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

export const creatTicketAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new ErrorHandler("Thiếu userId", 400);
    const newTicket = await createTicketService(userId, req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    await deleteTicketService(ticketId);
    res.status(200).json({ message: "xóa phiếu thành công" });
  } catch (error) {
    next(error);
  }
};

export const setSatusTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.query;
    const updated = await setStatusTicketService(ticketId, status);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
export const getTotalTickets = async (req, res, next) => {
  try {
    const total = await getTotalTicketsService();

    res.status(200).json({ totalTickets: total });
  } catch (error) {
    next(error);
  }
};
