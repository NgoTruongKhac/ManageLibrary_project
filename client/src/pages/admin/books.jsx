import { useEffect, useState } from "react";
import apiBook from "../../api/book.api";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { slugToNameMap } from "../../utils/categoriesMap";
import ModalAddBook from "../../components/modalAddBook";
import { toast } from "react-toastify";
import ModalEditBook from "../../components/modalEditBook";

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const page = parseInt(searchParams.get("page")) || 1;

  const fetchBooks = async () => {
    try {
      const res = await apiBook.getAllBooks(page);
      setBooks(res.data.books);
      setTotalPage(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    console.log("render book");
    fetchBooks();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const res = await apiBook.deleteBook(bookId);
      if (res) {
        fetchBooks();
        toast.success("xoá sách thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditBook = (bookId) => {
    setSelectedBook(bookId);
    document.getElementById("edit_book_modal").showModal();
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Danh sách sản phẩm</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Tìm kiếm sản phẩm..."
          className="w-1/3 input input-bordered"
        />
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("add_book_modal").showModal()}
        >
          <Plus className="w-4 h-4 mr-2" /> Thêm Sách
        </button>
      </div>

      <div className="overflow-x-auto border rounded-sm">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên sách</th>
              <th className="cursor-pointer">Ngày tạo</th>
              <th className="cursor-pointer">Danh mục</th>
              <th>Kho</th>
              <th>Sửa</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id.slice(0, 6)}..</td>
                <td className="">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-12 object-cover"
                  />
                </td>
                <td className="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {book.title}
                </td>
                <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                <td>{slugToNameMap.get(book.category)}</td>
                <td>{book.stock}</td>
                <td>
                  <button
                    size="sm"
                    className="btn btn-sm btn-info mr-1"
                    onClick={() => handleOpenEditBook(book._id)}
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    size="sm"
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="edit_book_modal" className="modal">
          {selectedBook && (
            <ModalEditBook bookId={selectedBook} onBookUpdated={fetchBooks} />
          )}
        </dialog>
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
      <dialog id="add_book_modal" className="modal">
        <ModalAddBook onBookAdded={fetchBooks} />
      </dialog>
    </div>
  );
}
