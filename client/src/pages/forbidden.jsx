import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-700 mb-6">
        Bạn không có quyền truy cập vào trang này.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
}
