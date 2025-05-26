import {
  getAllTicketByStatus,
  getTicketByStatus,
  getTicketByUserId,
  creatTicket,
  deleteTicket,
  setSatusTicket,
  creatTicketAdmin,
  getTotalTickets,
} from "../controllers/ticket.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth/veryfyToken.js";
import validate from "../middlewares/validations/validate.js";
import ticketValidationRules from "../middlewares/validations/ticket.validation.js";

const ticketRouter = Router();

ticketRouter.get("/admin/:status", getAllTicketByStatus);
ticketRouter.get("/total", getTotalTickets);
ticketRouter.get("/:status", verifyToken, getTicketByStatus); //?status="..."
ticketRouter.get("/", verifyToken, getTicketByUserId);
ticketRouter.post(
  "/:userId",
  validate(ticketValidationRules),
  creatTicketAdmin
);
ticketRouter.post(
  "/",
  verifyToken,
  validate(ticketValidationRules),
  creatTicket
);
ticketRouter.delete("/:ticketId", verifyToken, deleteTicket);
ticketRouter.patch("/:ticketId", verifyToken, setSatusTicket);

export default ticketRouter;
