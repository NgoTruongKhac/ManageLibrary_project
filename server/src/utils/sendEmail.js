import nodemailer from "nodemailer";
import { PASS_EMAIL } from "../configs/env.js";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "22130108@st.hcmuaf.edu.vn", // Thay bằng email của bạn
      pass: PASS_EMAIL, // Thay bằng mật khẩu hoặc App Password
    },
  });

  const mailOptions = {
    from: "22130108@st.hcmuaf.edu.vn",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
