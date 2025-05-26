import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/user.context";

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        {" "}
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    // Chưa đăng nhập
    return <Navigate to="/forbidden" replace />;
  }

  if (!user.isAdmin) {
    // Không phải admin
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
