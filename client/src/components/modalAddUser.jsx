import { useState } from "react";
import { Upload } from "lucide-react";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import apiUser from "../api/user.api";
import { toast } from "react-toastify";

export default function ModalAddUser({ onUserAdded }) {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const handleAddUser = async () => {
    try {
      if (
        !username ||
        !email ||
        !password ||
        !gender ||
        !birthday ||
        !imageFile
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin và chọn ảnh đại diện.");
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("birthday", birthday.toISOString());
      formData.append("avatar", imageFile);

      const res = await apiUser.createUser(formData);
      if (res) {
        setUsername("");
        setEmail("");
        setPassword("");
        setGender(null);
        setBirthday(null);
        setImage(null);
        setImageFile(null);

        toast.success("thêm tài khoản thành công");
        onUserAdded();
        document.getElementById("add_user_modal").close();
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm người dùng!");
    }
  };

  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <h3 className="font-bold text-lg mb-6">Thêm tài khoản</h3>

      <div className="space-y-4">
        {/* Avatar */}
        <div className="grid grid-cols-12 items-center gap-4">
          <label className="col-span-3 font-medium">Ảnh đại diện</label>
          <div className="col-span-9 flex items-center gap-4">
            <label className="btn btn-sm btn-outline gap-2 cursor-pointer">
              <Upload size={18} />
              Chọn ảnh
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setImage(URL.createObjectURL(file));
                    setImageFile(file);
                  } else {
                    setImage(null);
                    setImageFile(null);
                  }
                }}
              />
            </label>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Username */}
        <div className="grid grid-cols-12 items-center gap-4">
          <label className="col-span-3 font-semibold">Tên tài khoản</label>
          <input
            type="text"
            className="input input-bordered col-span-9"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên"
          />
        </div>

        {/* Email */}
        <div className="grid grid-cols-12 items-center gap-4">
          <label className="col-span-3 font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered col-span-9"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </div>

        {/* Password */}
        <div className="grid grid-cols-12 items-center gap-4">
          <label className="col-span-3 font-medium">Mật khẩu</label>
          <input
            type="password"
            className="input input-bordered col-span-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>

        {/* Gender */}
        <div className="grid grid-cols-12 items-center gap-4">
          <label className="col-span-3 font-medium">Giới tính</label>
          <div className="col-span-9 flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="radio radio-sm"
                checked={gender === "nam"}
                onChange={() => setGender("nam")}
              />
              <span>Nam</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="radio radio-sm"
                checked={gender === "nữ"}
                onChange={() => setGender("nữ")}
              />
              <span>Nữ</span>
            </label>
          </div>
        </div>

        {/* Birthday */}
        <div className="grid grid-cols-12 items-center gap-4">
          <label className="col-span-3 font-medium">Ngày sinh</label>
          <div className="col-span-9">
            <DatePicker
              locale={vi}
              dateFormat="dd/MM/yyyy"
              selected={birthday}
              onChange={(date) => setBirthday(date)}
              className="input input-bordered w-[319px]"
              placeholderText="Chọn ngày sinh"
            />
          </div>
        </div>
      </div>

      <div className="modal-action mt-6">
        <button className="btn btn-primary" onClick={handleAddUser}>
          Thêm{" "}
        </button>
      </div>
    </div>
  );
}
