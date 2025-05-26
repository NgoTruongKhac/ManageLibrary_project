import { useUser } from "../contexts/user.context";
import apiUser from "../api/user.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Image } from "lucide-react";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
  //setUser từ Context
  const { user, setUser, loading } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // Khi user thay đổi, cập nhật lại các state
  useEffect(() => {
    console.log("profile");
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setGender(user.gender || null);
      setBirthday(user.birthday || null);
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleUpdateInfo = async () => {
    try {
      const res = await apiUser.updateUser(user._id, {
        username,
        email,
        gender,
        birthday,
      });
      if (!res) {
        setUser(res.data);
      }
      toast.success("đã lưu thay đổi");
    } catch (err) {
      console.error(err);
    }
  };

  const handleupdateAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await apiUser.updateAvatar(user._id, formData);
      if (res.status === 200) {
        const newAvatarPath = res.data.avatar;
        setAvatar(newAvatarPath);
        setUser({ ...user, avatar: res.data.avatar });
        toast.success("Cập nhật ảnh đại diện thành công!");
      }
    } catch (err) {
      toast.error("Lỗi khi cập nhật ảnh đại diện!");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="mt-5 mb-5 flex justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="flex w-full max-w-3xl border  rounded-lg overflow-hidden shadow-md mb-5">
      {/* Left panel - User info */}
      <div className="w-1/3 p-6 flex flex-col items-center bg-primary-content border-r">
        <div className="avatar mb-5 mt-5">
          <div className="w-30 rounded-full border">
            <img src={avatar} />
          </div>
        </div>
        <label>
          <input
            type="file"
            hidden
            name="avatar"
            onChange={handleupdateAvatar}
          />
          <div className="flex flex-row w-26 h-7 px-2 bg-info rounded-2xl shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
            <Image size={17} />
            <span className="ms-1">thay ảnh </span>
          </div>
        </label>
      </div>

      {/* Right panel - Content area */}
      <div className="w-2/3 p-8 flex flex-col justify-center">
        {/* Top button/search */}
        <div className="w-full h-12 mb-3 text-center">
          <p className="text-2xl text-gray-700 font-medium">
            Thông tin tài khoản
          </p>
        </div>

        {/* Content blocks */}
        <div className="flex flex-col items-center">
          <div className="w-[18rem] mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Tên
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="w-[18rem] mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="w-[18rem] mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Giới tính
            </label>

            <div className="flex row ms-3">
              <div className="me-6">
                <label className="label me-1">Nam</label>
                <input
                  type="radio"
                  name="render"
                  className="radio size-5"
                  value="nam"
                  checked={gender === "nam"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div>
                <label className="label me-1">Nữ</label>
                <input
                  type="radio"
                  name="render"
                  className="radio size-5"
                  value="nữ"
                  checked={gender === "nữ"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-[18rem] mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Ngày sinh
            </label>

            <label className="input">
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                locale={vi}
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày sinh"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-calendar-icon lucide-calendar"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                }
              />
            </label>
          </div>
          <div className="w-[18rem] mt-3 flex justify-end">
            <button
              className="btn btn-outline btn-info"
              onClick={handleUpdateInfo}
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
