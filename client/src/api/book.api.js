import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/book`,
  withCredentials: true,
});

const apiBook = {
  getAllBooks: async (page) => await API.get(`/?page=${page}`),
  getBookByCategories: async (category, page) =>
    await API.get(`/filterCategory?category=${category}&page=${page}`),
  getBookBySubCategories: async (subCategory, page) =>
    await API.get(`/filterSubCategory?subCategory=${subCategory}&page=${page}`),
  getBook: async (bookId) => await API.get(`/${bookId}`),
  getBooksByTitle: async (keyWord) =>
    await API.get(`/search?keyWord=${keyWord}`),
  createBook: async (newBook) => await API.post("/", newBook),
  deleteBook: async (bookId) => await API.delete(`${bookId}`),
  editBook: async (bookId, book) => await API.patch(`/${bookId}`, book),
  getTotalBooks: async () => await API.get("/total"),
};
export default apiBook;
