import { useState } from "react";
import { categories } from "../utils/categories";
import { Upload } from "lucide-react";
import apiBook from "../api/book.api";
import { toast } from "react-toastify";
import { slugify } from "../utils/slugify";

export default function ModalAddBook({ onBookAdded }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleAddBook = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("publicationYear", publishYear);
    formData.append("stock", stock);
    formData.append("category", selectedCategory);
    formData.append("subCategory", selectedSubCategory);
    formData.append("description", description);
    formData.append("coverImage", imageFile);

    try {
      const res = await apiBook.createBook(formData);
      console.log("Sách đã được thêm:", res.data);
      // Reset form
      setTitle("");
      setAuthor("");
      setPublisher("");
      setPublishYear("");
      setStock("");
      setSelectedCategory("");
      setSubCategories([]);
      setSelectedSubCategory("");
      setDescription("");
      setImage(null);
      setImageFile(null);

      //render lại danh sách book
      if (onBookAdded) {
        onBookAdded();
      }

      toast.success("thêm sách thành công");
      document.getElementById("add_book_modal").close();
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
      alert("Thêm sách thất bại!");
    }
  };

  return (
    <div className="modal-box max-w-3xl">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <h3 className="font-bold text-lg mb-4">Thêm sách</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-9 gap-2">
          <input
            type="text"
            placeholder="Tiêu đề sách"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full col-span-7"
          />
          <label className="w-full col-span-1 flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              hidden
              className="file-input file-input-bordered"
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
            <Upload size={24} />
            <span className="text-xs">chọn ảnh</span>
          </label>
          <div className="w-full col-span-1 flex items-center justify-center">
            {image && (
              <img src={image} alt="Preview" className="w-12 object-contain" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tác giả"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Nhà xuất bản"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Năm xuất bản"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Số lượng"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Select Category & SubCategory */}
        <div className="grid grid-cols-2 gap-4">
          <select
            className="select select-bordered w-full"
            value={selectedCategory}
            onChange={(e) => {
              const selected = e.target.value;
              setSelectedCategory(slugify(selected));
              const sub =
                categories.find((cat) => cat.title === selected)?.links || [];
              setSubCategories(sub);
              setSelectedSubCategory(""); // reset subcategory
            }}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cat) => (
              <option key={cat.title} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(slugify(e.target.value))}
            disabled={!subCategories.length}
          >
            <option value="">Chọn thể loại</option>
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Description (textEditor giả định là textarea hoặc component khác) */}
        <textarea
          placeholder="Mô tả sách..."
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        ></textarea>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleAddBook}>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
