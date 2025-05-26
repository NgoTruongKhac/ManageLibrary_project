import { Plus } from "lucide-react";

import { useSearchParams } from "react-router-dom";
import apiUser from "../../api/user.api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ModalAddUser from "../../components/modalAddUser";
import ModalEditUser from "../../components/modalEditUser";

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);

  const [totalPage, setTotalPage] = useState(null);
  const page = parseInt(searchParams.get("page")) || 1;
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await apiUser.getAllUsers(page);
      setUsers(res.data.users);
      setTotalPage(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    console.log("render book");
    fetchUsers();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const handleOpenEditUser = (userId) => {
    setSelectedUser(userId);
    document.getElementById("edit_user_modal").showModal();
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      text: "Xác nhận xoá tài khoản này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "xoá",
      cancelButtonText: "Không",
      width: "370px",
      customClass: {
        icon: "w-2 h-2",
        text: "text-lg font-medium",
        confirmButton: "btn btn-ouline btn-success mr-3",
        cancelButton: "btn btn-ouline btn-error ml-3",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // xử lý duyệt phiếu ở đây
        try {
          const res = await apiUser.deleteUser(userId);
          if (res) {
            fetchUsers();
            toast.success("xoá tài khoản thành công");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Người dùng đã chọn 'Không'");
      }
    });
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Danh sách Tài khoản</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Tìm kiếm tài khoản..."
          className="w-1/3 input input-bordered"
        />
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("add_user_modal").showModal()}
        >
          <Plus className="w-4 h-4 mr-2" /> Thêm tài khoản
        </button>
      </div>

      <div className="overflow-x-auto border rounded-sm">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>userID</th>
              <th>Avatar</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Ngày tạo</th>
              <th>Sửa</th>
              <th>Xoá</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id.slice(0, 6)}..</td>
                <td className="">
                  <img src={user.avatar} className="w-12 object-cover" />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-outline btn-info btn-sm"
                    onClick={() => handleOpenEditUser(user._id)}
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="edit_user_modal" className="modal">
          {selectedUser && (
            <ModalEditUser userId={selectedUser} onUserUpdated={fetchUsers} />
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
      <dialog className="modal" id="add_user_modal">
        <ModalAddUser onUserAdded={fetchUsers} />
      </dialog>
    </div>
  );
}
