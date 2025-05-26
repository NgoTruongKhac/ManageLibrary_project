import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile";
import { UserProvider } from "./contexts/user.context";
import FilterBook from "./pages/filterBook";
import DetailBook from "./pages/detailBook";
import Cart from "./pages/cart";
import GoogleAuthSuccess from "./pages/googleAuthSucess";
import MyTicket from "./pages/myTicket";
import TicketBorrow from "./pages/myTicket/ticketBorrow";
import TicketApproval from "./pages/myTicket/ticketApproval";
import TicketReturn from "./pages/myTicket/ticketReturn";
import TicketCancel from "./pages/myTicket/ticketCancel";
import AppAdmin from "./pages/admin/app";
import Dashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import Books from "./pages/admin/books";
import Tickets from "./pages/admin/tickets";
import Layout from "./layouts/layout";
import TicketApprovaled from "./pages/myTicket/ticketApprovaled";
import ProtectedRoute from "./components/protectedRoute";
import Forbidden from "./pages/forbidden";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AppAdmin />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user" element={<Users />} />
              <Route path="book" element={<Books />} />
              <Route path="ticket" element={<Tickets />} />
            </Route>
          </Route>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route
              path="/:category/:subCategory/:bookId"
              element={<DetailBook />}
            />
            <Route path="/:category/:subCategory" element={<FilterBook />} />
            <Route path="/:category" element={<FilterBook />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<MyTicket />}>
              <Route path="ticket-borrow" element={<TicketBorrow />} />
              <Route path="ticket-approval" element={<TicketApproval />} />
              <Route path="ticket-approvaled" element={<TicketApprovaled />} />
              <Route path="ticket-return" element={<TicketReturn />} />
              <Route path="ticket-cancel" element={<TicketCancel />} />
            </Route>
            <Route
              path="/google-auth-success"
              element={<GoogleAuthSuccess />}
            />
          </Route>
          <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
        <ToastContainer autoClose={1600} pauseOnHover={false} />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
