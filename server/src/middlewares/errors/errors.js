const errorHandler = (err, req, res, next) => {
  let message = err.message || "Lỗi máy chủ";
  let statusCode = err.statusCode || 500;

  // Xử lý lỗi unique của Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // Lấy tên field bị trùng
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} đã tồn tại`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    status: statusCode,
  });
};
export default errorHandler;
