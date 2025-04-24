// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
// } from "react-router-dom";
// import "./App.css";
// import CustomNavbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Home from "./pages/home/Home";
// import Gig from "./pages/Gig/Gig";
// import AddGig from "./pages/addGig/Add";
// import VerificationPage from "./pages/completeVerify/VerificationPage";
// import MyGigs from "./pages/myGigs/MyGigs";
// import Gigs from "./pages/Gigs/Gigs";
// import Orders from "./pages/orders/Orders";
// import Message from "./pages/Message/Message";
// import Messages from "./pages/Messages/Messages";
// import Register from "./pages/registeration/register";
// import FreelancerDashboard from "./pages/freelancerDashboard/FreelancerDashboard";
// import AdminDashboard from "./pages/adminDashboard/Dashboard";
// import Users from "./pages/adminDashboard/Users";
// import AdminLayout from "./components/adminLayout/AdminLayout";
// import ManageOrders from "./pages/adminDashboard/Orders";
// import AdminGigs from "./pages/adminDashboard/AdminGigs";
// const Layout = () => {
//   return (
//     <>
//       <CustomNavbar />
//       <div className="min-h-screen bg-gray-100 mt-20">
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// };
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Main Layout Routes */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} /> {/* ✅ Home page appears first */}
//           <Route path="gigs" element={<Gigs />} />
//           <Route path="addGig" element={<AddGig />} />
//           <Route path="gig/:id" element={<Gig />} />
//           <Route path="add-gig" element={<AddGig />} />
//           <Route path="myGigs" element={<MyGigs />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="messages" element={<Messages />} />
//           <Route path="message/:id" element={<Message />} />
//           <Route path="verify" element={<VerificationPage />} />
//           <Route path="FreelancerDashboard" element={<FreelancerDashboard />} />
//         </Route>

//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="clients" element={<Users />} />
//           {/* Add other admin routes here */}
//           <Route path="freelancers" element={<Users />} />{" "}
//           {/* Assuming this is a placeholder */}
//           <Route path="gigs" element={<AdminGigs />} /> {/* Placeholder */}
//           <Route path="orders" element={<ManageOrders />} /> {/* Placeholder */}
//           <Route path="transactions" element={<ManageOrders />} />{" "}
//           {/* Placeholder */}
//         </Route>

//         {/* Keep the register route for direct access via URL, but it will mostly be accessed via modal */}

//         <Route
//           path="/register"
//           element={
//             <>
//               <CustomNavbar />
//               <div className="min-h-screen bg-gray-100 ">
//                 <Register />
//               </div>
//               <Footer />
//             </>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import CustomNavbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gig from "./pages/Gig/Gig";
import AddGig from "./pages/addGig/Add";
import VerificationPage from "./pages/completeVerify/VerificationPage";
import MyGigs from "./pages/myGigs/MyGigs";
import Gigs from "./pages/Gigs/Gigs";
import Orders from "./pages/orders/Orders";
import Message from "./pages/Message/Message";
import Messages from "./pages/Messages/Messages";
import Register from "./pages/registeration/register";
import FreelancerDashboard from "./pages/freelancerDashboard/FreelancerDashboard";
import AdminDashboard from "./pages/adminDashboard/Dashboard";
import Users from "./pages/adminDashboard/Users";
import AdminLayout from "./components/adminLayout/AdminLayout";
import ManageOrders from "./pages/adminDashboard/Orders";
import AdminGigs from "./pages/adminDashboard/AdminGigs";

// Get current user from localStorage
const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
};

const Layout = () => (
  <>
    <CustomNavbar />
    <div className="min-h-screen bg-gray-100 mt-20">
      <Outlet />
    </div>
    <Footer />
  </>
);

// Route guards
const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/register" replace />;
};

const SellerRoute = ({ children }) => {
  const user = getCurrentUser();
  return user?.isSeller ? children : <Navigate to="/" replace />;
};

const GuestRoute = ({ children }) => {
  const user = getCurrentUser();
  return !user ? children : <Navigate to="/" replace />;
};
const AdminRoute = ({ children }) => {
  return children ;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="gigs"
            element={
              <ProtectedRoute>
                <Gigs />
              </ProtectedRoute>
            }
          />
          <Route
            path="addGig"
            element={
              <SellerRoute>
                <AddGig />
              </SellerRoute>
            }
          />
          <Route
            path="gig/:id"
            element={
              <ProtectedRoute>
                <Gig />
              </ProtectedRoute>
            }
          />
          <Route
            path="myGigs"
            element={
              <SellerRoute>
                <MyGigs />
              </SellerRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="message/:id"
            element={
              <ProtectedRoute>
                <Message />
              </ProtectedRoute>
            }
          />
          <Route
            path="verify"
            element={
              <ProtectedRoute>
                <VerificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="FreelancerDashboard"
            element={
              <SellerRoute>
                <FreelancerDashboard />
              </SellerRoute>
            }
          />
        </Route>

        {/* Admin route - completely blocked for now */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clients" element={<Users />} />
          <Route path="freelancers" element={<Users />} />
          <Route path="gigs" element={<AdminGigs />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="transactions" element={<ManageOrders />} />
        </Route>

        {/* Register route only for guests */}
        <Route
          path="/register"
          element={
            <GuestRoute>
              <>
                <CustomNavbar />
                <div className="min-h-screen bg-gray-100">
                  <Register />
                </div>
                <Footer />
              </>
            </GuestRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
