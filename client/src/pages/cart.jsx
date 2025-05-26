import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ticketApi from "../api/ticket.api";

import {
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from "../redux/cartSlice";

export default function Cart() {
  //   const [carts, setCarts] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);
  const [isDeleting, setIsDeleting] = useState([]);

  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (bookId) => {
    dispatch(increaseQuantity(bookId));
  };

  const handleDecrease = (bookId) => {
    dispatch(decreaseQuantity(bookId));
  };

  const handleDeleteCart = (bookId) => {
    setIsDeleting((prev) => [...prev, bookId]);
    dispatch(deleteCart(bookId))
      .unwrap()
      .then(() => {
        toast.success("Xóa thành công");
      })
      .catch(() => {
        toast.error("Xóa thất bại. Vui lòng thử lại");
      })
      .finally(() => {
        setIsDeleting((prev) => prev.filter((id) => id !== bookId));
      });
  };

  const handleCreateTicket = async () => {
    if (!borrowDate || !returnDate || selectedBooks.length === 0) {
      toast.warning("Vui lòng chọn đủ ngày và ít nhất một sách");
      return;
    }
    console.log(selectedBooks);

    const ticketBody = {
      borrowDate: borrowDate, // hoặc dùng dayjs nếu cần format khác
      returnDate: returnDate,
      note: note,
      books: selectedBooks.map((book) => ({
        bookId: book.bookId,
        quantity: book.quantity,
      })),
    };

    try {
      await ticketApi.createTicket(ticketBody);

      // reset nếu cần
      setSelectedBooks([]);
      setNote("");
      setBorrowDate(null);
      setReturnDate(null);
      dispatch(fetchCart());
      setError({});
      toast.success("Tạo phiếu thành công!");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // chuyển mảng lỗi thành object key: message
        const errorObj = {};
        err.response.data.errors.forEach((e) => {
          errorObj[e.field] = e.message;
        });
        setError(errorObj);
      } else {
        toast.error("Lỗi không xác định, vui lòng thử lại");
      }
    }
  };

  return (
    <div className="w-full max-w-[90%] grid grid-cols-7 grid-rows-5 gap-3 mt-3 mb-5">
      <div className="col-span-4 row-span-5 max-h-[500px] overflow-y-auto pr-2">
        {carts.map((item) => (
          <div
            key={item.bookId}
            className="flex items-center gap-3 p-2 mb-3 border rounded-md shadow-sm bg-white"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-info checkbox-xs rounded-[3px] ms-2"
              checked={selectedBooks.some((b) => b.bookId === item.bookId)}
              onChange={(e) => {
                setSelectedBooks((prev) => {
                  if (e.target.checked) {
                    return [...prev, item];
                  } else {
                    return prev.filter((b) => b.bookId !== item.bookId);
                  }
                });
              }}
            />

            <img
              src={item.coverImage}
              alt={item.title}
              className="w-15 object-cover rounded"
            />

            <div className="flex-[5] min-w-0">
              <Link to={`/${item.category}/${item.subCategory}/${item.bookId}`}>
                <span className="text-sm truncate block font-medium">
                  {item.title}
                </span>
              </Link>

              <p className="text-sm text-gray-500">Còn lại: {item.stock}</p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDecrease(item.bookId)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                -
              </button>
              <span className="w-7 text-center">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item.bookId)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="flex-[1] flex justify-center">
              <button
                className="hover: cursor-pointer flex justify-center"
                onClick={() => handleDeleteCart(item.bookId)}
              >
                {isDeleting.includes(item.bookId) ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Trash2 />
                )}
              </button>
            </div>
          </div>
        ))}

        {carts.length === 0 && (
          <div className="text-center text-gray-500">Giỏ hàng trống</div>
        )}
      </div>
      <div className="col-span-3 row-span-5 col-start-5 rounded-md border shadow-md p-6 bg-white max-h-[500px] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6 text-gray-700">
          Tạo phiếu mượn
        </h2>

        <div className="mb-2 flex items-center gap-x-4">
          <label className="w-28 text-sm font-medium text-gray-700">
            Ngày mượn
          </label>
          <DatePicker
            locale={vi}
            dateFormat="dd/MM/yyyy"
            placeholderText="chọn ngày mượn"
            selected={borrowDate}
            onChange={(date) => setBorrowDate(date)}
            className="input input-sm input-bordered w-full"
            wrapperClassName="w-full"
          />
        </div>
        {error.borrowDate && (
          <span className="text-red-600 text-sm ml-1 text-center mb-2">
            {error.borrowDate}
          </span>
        )}

        {/* Ngày trả */}
        <div className="mb-2 flex items-center gap-x-4">
          <label className="w-28 text-sm font-medium text-gray-700">
            Ngày trả
          </label>
          <DatePicker
            locale={vi}
            dateFormat="dd/MM/yyyy"
            placeholderText="chọn ngày trả"
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            className="input input-sm input-bordered w-full"
            wrapperClassName="w-full"
          />
        </div>
        {error.returnDate && (
          <span className="text-red-600 text-sm ml-1 text-center mb-2">
            {error.returnDate}
          </span>
        )}

        {/* Ghi chú */}
        <div className="mb-4 flex items-start gap-x-4">
          <label className="w-28 text-sm font-medium text-gray-700 mt-1">
            Ghi chú
          </label>
          <textarea
            className="textarea textarea-bordered textarea-sm w-full"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ghi chú (nếu có)"
          ></textarea>
        </div>

        {/* Sách đã chọn */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Sách đã chọn
          </label>
          {selectedBooks.length === 0 ? (
            <div className="p-3 text-sm italic">Chưa có sách nào được chọn</div>
          ) : (
            <div className="space-y-2">
              {selectedBooks.map((book) => (
                <div
                  key={book.bookId}
                  className="flex items-center gap-3 border rounded p-2"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm  truncate">{book.title}</p>
                    <p className="text-sm text-gray-600">
                      Số lượng: {book.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-outline btn-info"
            onClick={handleCreateTicket}
          >
            Tạo phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
