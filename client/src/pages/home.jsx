import { useEffect, useState } from "react";
import apiBook from "../api/book.api";
import apiCart from "../api/cart.api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image from "../assets/ai-books.jpg";
import { Star, ShoppingCart, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/cartSlice";
import { useUser } from "../contexts/user.context";

function Home() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await apiBook.getAllBooks(page);
        const newBooks = res.data.books;
        setBooks((prevBooks) => [...prevBooks, ...newBooks]); // Thêm sách mới vào danh sách cũ
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    console.log("call");

    fetchBooks();
  }, [page]);

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

  const handleMoreBook = () => {
    setPage((prev) => prev + 1); // Tăng page lên để gọi API trang kế tiếp
  };

  return (
    <div className="w-full max-w-[90%]">
      <div className="mb-5">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img
              src={image}
              alt="Slide 1"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={image}
              alt="Slide 2"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={image}
              alt="Slide 3"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="text-2xl font-semibold">Sách nổi bật</div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-sm mx-auto w-full border h-[370px] flex flex-col"
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
                <Star size={18} className="stroke-warning fill-warning" />
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
          <button className="btn btn-outline btn-info" onClick={handleMoreBook}>
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
