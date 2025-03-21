// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
// import "./App.css";
// import CustomNavbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import GigCard from "./components/gigCard/GigCard";
// import { gigs } from "./data";
// import Home from "./pages/home/Home";
// import Gig from "./pages/Gig/Gig";
// import AddGig from "./pages/addGig/Add";
// import VerificationPage from "./pages/completeVerify/VerificationPage"
// import MyGigs from "./pages/myGigs/MyGigs";
// import Gigs from "./pages/Gigs/Gigs";
// import Orders from "./pages/orders/Orders";
// import Message from "./pages/Message/Message";
// import Messages from "./pages/Messages/Messages";
// const Layout = () => {
//   return (
//     <>
//       <CustomNavbar />
//       <div className="min-h-screen bg-gray-100 mt-20">
//         <Outlet /> {/* Renders the child route content */}
//       </div>
//       <Footer />
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={< Messages/>}>
//           <Route
//             index
//             element={
//               <div className="max-w-6xl mx-auto px-4 py-10">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {gigs.map((item) => (
//                     <GigCard key={item.id} item={item} />
//                   ))}
//                 </div>
//               </div>
//             }
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
const Layout = () => {
  return (
    <>
      <CustomNavbar />
      <div className="min-h-screen bg-gray-100 mt-20">
        <Outlet /> 
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* ✅ Home page appears first */}
          <Route path="gigs" element={<Gigs />} />
          <Route path="addGig" element={<AddGig />} />
          <Route path="gig/:id" element={<Gig />} />
          <Route path="add-gig" element={<AddGig />} />
          <Route path="myGigs" element={<MyGigs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="messages" element={<Messages />} />
          <Route path="message/:id" element={<Message />} />
          <Route path="verify" element={<VerificationPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
