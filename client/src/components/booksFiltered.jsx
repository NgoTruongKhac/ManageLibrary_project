import { useState, useEffect } from "react";
import apiBook from "../api/book.api";
// import { useFilterBook } from "../contexts/filterBook.context";
import { Star, ShoppingCart, Plus } from "lucide-react";
// import { useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import apiCart from "../api/cart.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/cartSlice";
import { useUser } from "../contexts/user.context";

function BooksFiltered() {
  const [books, setBooks] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const { user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const { category, subCategory } = useParams();
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  useEffect(() => {
    console.log("render book");
    const fetchBooks = async () => {
      try {
        let res;
        if (subCategory) {
          res = await apiBook.getBookBySubCategories(subCategory, page);
        } else {
          res = await apiBook.getBookByCategories(category, page);
        }
        const newBooks = res.data.books;
        console.log(newBooks);
        setTotalPage(res.data.totalPages);
        console.log(totalPage);
        setBooks(newBooks); // Thêm sách mới vào danh sách cũ
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [page, subCategory, category]);

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

  if (books.length === 0) {
    return (
      <div className="flex justify-center">
        <h1>không có sách nào</h1>
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
      {books.map((book, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-sm mx-auto w-full border h-[345px] flex flex-col"
        >
          <figure className="px-6 pt-6">
            <img
              src={book.coverImage}
              alt={book.title}
              className="rounded-xl h-47 object-cover w-full"
            />
          </figure>

          <div className="card-body items-center text-center flex-1 flex flex-col justify-between">
            <Link to={`/${book.category}/${book.subCategory}/${book._id}`}>
              <h4 className="card-title text-sm font-semibold line-clamp-2 h-[2.8em]">
                {book.title}
              </h4>
            </Link>

            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <Star size={16} className="stroke-warning fill-warning" />
              <span>(0)</span>
              <span className="mx-2">|</span>
              <span>nhận xét(0)</span>
            </div>

            <div className="card-actions mt-3">
              <button
                className="btn btn-outline btn-primary"
                onClick={() => handleAddCart(book._id)}
              >
                <Plus size={18} />
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="col-span-full flex justify-center mt-4">
        <div className="join">
          {Array.from({ length: totalPage || 0 }, (_, index) => index + 1).map(
            (pageNumber) => (
              <input
                key={pageNumber}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={pageNumber.toString()}
                checked={page === pageNumber}
                onChange={() => handlePageChange(pageNumber)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksFiltered;
