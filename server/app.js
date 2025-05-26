import express from "express";
import { PORT } from "./src/configs/env.js";
import connectDb from "./src/database/mongodb.js";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";
import bookRouter from "./src/routes/book.route.js";
import cartRouter from "./src/routes/cart.route.js";
import ticketRouter from "./src/routes/ticket.route.js";
import errorHandler from "./src/middlewares/errors/errors.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { SESSION_SECRET } from "./src/configs/env.js";
import { FONTEND_DOMAIN } from "./src/configs/env.js";
import "./src/configs/passport.js";

const app = express();

connectDb();

app.use(
  cors({
    origin: FONTEND_DOMAIN, // frontend domain
    credentials: true,
  })
);

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("welcome to api");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
