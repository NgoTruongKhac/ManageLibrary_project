import { body } from "express-validator";
import dayjs from "dayjs";

const ticketValidationRules = [
  body("borrowDate")
    .notEmpty()
    .withMessage("Ngày mượn là bắt buộc")
    .isISO8601()
    .withMessage("Ngày mượn không hợp lệ")
    .toDate()
    .custom((value) => {
      const today = dayjs().startOf("day");
      const borrow = dayjs(value).startOf("day");
      if (borrow.isBefore(today)) {
        throw new Error("Ngày mượn không được là quá khứ");
      }
      return true;
    }),

  body("returnDate")
    .notEmpty()
    .withMessage("Ngày trả là bắt buộc")
    .isISO8601()
    .withMessage("Ngày trả không hợp lệ")
    .toDate()
    .custom((value, { req }) => {
      const borrow = dayjs(req.body.borrowDate).startOf("day");
      const returnDate = dayjs(value).startOf("day");
      if (returnDate.diff(borrow, "day") > 14) {
        throw new Error("Ngày trả không được quá 14 ngày kể từ ngày mượn");
      }
      return true;
    }),
];

export default ticketValidationRules;
