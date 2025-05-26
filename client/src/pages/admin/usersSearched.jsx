import { useEffect, useState, useRef } from "react";
import apiUser from "../../api/user.api";

export default function UsersSearched({ onKeyWord, onClose, onSelect }) {
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("search");
    const delayDebounce = setTimeout(() => {
      if (onKeyWord.trim() !== "") {
        apiUser
          .getUserByEmail(onKeyWord)
          .then((res) => setResults(res.data || []))
          .catch((err) => {
            console.error("Lỗi tìm kiếm sách:", err);
            setResults([]);
          });
      } else {
        setResults([]);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [onKeyWord]);

  // Xử lý click ngoài dropdown để ẩn kết quả
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setResults([]); // Ẩn dropdown
        if (onClose) onClose(); // Nếu cần báo cho cha component
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (onKeyWord.trim() === "") return null;

  if (results.length === 0)
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[80%] mt-2 bg-white shadow-lg z-20 rounded-lg p-2 max-h-[300px] overflow-y-auto border">
        không có user nào
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="dropdown-content absolute top-full left-1/2 transform -translate-x-1/2 w-[80%] mt-2 bg-white shadow-lg z-20 rounded-lg p-2 max-h-[392px] overflow-y-auto border"
    >
      {results.map((user) => (
        <a
          key={user._id}
          className="flex items-center gap-2 p-1 hover:bg-gray-100 cursor-pointer rounded-md"
          role="button"
          onClick={() => onSelect(user)}
        >
          <span className="font-medium text-red-500 truncate block max-w-full text-xs">
            {user.email}
          </span>
          <span className="font-medium text-gray-700 truncate block max-w-full text-xs">
            {user.username}
          </span>
        </a>
      ))}
    </div>
  );
}
