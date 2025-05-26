import { ShoppingCart, BookOpenText } from "lucide-react";
import apiBook from "../api/book.api";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { slugToNameMap } from "../utils/categoriesMap";
import apiCart from "../api/cart.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/cartSlice";
import PDFViewer from "../components/PDFViewer";
import { useUser } from "../contexts/user.context";

const url = import.meta.env.VITE_API_URL;

function DetailBook() {
  const [book, setBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { bookId } = useParams();
  const { user } = useUser();

  const dispatch = useDispatch();

  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    console.log("detail book");
    const fetchBook = async () => {
      try {
        const response = await apiBook.getBook(bookId);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleAddCart = async (bookId) => {
    if (!user) {
      const modal = document.getElementById("require_sign_in");
      if (modal) modal.showModal();
      return;
    }

    try {
      const { data } = await apiCart.addCart(bookId);
      if (data) {
        toast.success("Thêm giỏ hàng thành công");
        dispatch(fetchCart());
      }
    } catch (error) {
      console.error("Lỗi khi thêm giỏ hàng:", error);
    }
  };

  if (!book) {
    return (
      <div className="text-center mt-10 text-xl">Đang tải dữ liệu sách...</div>
    );
  }

  const maxDescriptionLength = 400;
  const isLongDescription = book.description.length > maxDescriptionLength;

  const displayedDescription = showFullDescription
    ? book.description
    : book.description.slice(0, maxDescriptionLength) +
      (isLongDescription ? "..." : "");

  const handleReadEbook = async (ebook) => {
    if (ebook) {
      setShowPDF(true);
    } else {
      toast.error("không có bản ebook");
    }
  };

  return (
    <div className="w-full max-w-[90%] grid grid-cols-5 gap-4 mb-7">
      <div className="col-span-2 h-[28rem] flex flex-col items-center justify-center rounded-md border">
        <div className="w-[75%] mb-1 mx-auto">
          <img src={book.coverImage} alt="" className="mx-auto" />
        </div>
      </div>

      <div className="col-span-3 col-start-3 border rounded-md p-4 flex flex-col gap-4">
        <div className="text-3xl font-semibold mb-2 mt-1">{book.title}</div>

        <div className="grid grid-cols-2 gap-y-2 text-base">
          <div>
            <span className="font-semibold">Tác giả:</span> {book.author}
          </div>
          <div>
            <span className="font-semibold">Thể loại:</span>{" "}
            {`${slugToNameMap.get(book.category)}, ${slugToNameMap.get(
              book.subCategory
            )}`}
          </div>
          <div>
            <span className="font-semibold">Nhà xuất bản:</span>{" "}
            {book.publisher}
          </div>
          <div>
            <span className="font-semibold">Tình trạng kho:</span> {book.stock}
          </div>
        </div>

        <div className="text-base">
          <span className="font-semibold">Đánh giá:</span> ⭐(
          {book.rating.average}) - nhận xét({book.rating.count})
        </div>
        <div className="">
          <button
            className="btn btn-outline btn-info"
            onClick={() => handleAddCart(book._id)}
          >
            thêm vào giỏ hàng
            <ShoppingCart size={19} />
          </button>
          <button
            className="btn btn-outline btn-warning ml-5"
            onClick={() => handleReadEbook(book.ebook)}
          >
            Đọc ebook
            <BookOpenText size={19} />
          </button>
        </div>

        <div className="text-base">
          <span className="font-semibold">Mô tả chi tiết:</span>
          <br />
          {displayedDescription}
          {isLongDescription && (
            <button
              className="text-blue-600 ml-2 underline hover: cursor-pointer"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
      {showPDF && (
        <PDFViewer
          fileUrl={`${url}${book.ebook}`}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  );
}
export default DetailBook;
