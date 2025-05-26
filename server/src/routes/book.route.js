import {
  createBook,
  deleteBook,
  editBook,
  getBook,
  getAllBooks,
  getBooksByCategory,
  getBooksBySubCategory,
  getBooksByTitle,
  getTotalBooks,
} from "../controllers/book.controller.js";

import { Router } from "express";
import uploadBookImage from "../configs/multerBook.js";

const bookRouter = Router();

bookRouter.get("/filterCategory", getBooksByCategory);
bookRouter.get("/filterSubCategory", getBooksBySubCategory);
bookRouter.get("/search", getBooksByTitle);
bookRouter.get("/total", getTotalBooks);
bookRouter.post("/", uploadBookImage.single("coverImage"), createBook);
bookRouter.get("/", getAllBooks);
bookRouter.patch("/:bookId", uploadBookImage.single("coverImage"), editBook);
bookRouter.get("/:bookId", getBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
