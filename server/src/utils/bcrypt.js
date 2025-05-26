import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

export default hashPassword;
