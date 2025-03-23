// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Orders = () => {
//   const currentUser = {
//     id: 1,
//     username: "Anna",
//     isSeller: true,
//   };

//   const orders = [
//     {
//       id: 1,
//       title: "Stunning concept art",
//       price: 59.99,
//       buyer: "Maria Anders",
//       img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 2,
//       title: "AI generated concept art",
//       price: 79.99,
//       buyer: "Francisco Chang",
//       img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 3,
//       title: "High quality digital character",
//       price: 110.99,
//       buyer: "Roland Mendel",
//       img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 4,
//       title: "Illustration hyper realistic painting",
//       price: 39.99,
//       buyer: "Helen Bennett",
//       img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 5,
//       title: "Original AI generated digital art",
//       price: 119.99,
//       buyer: "Yoshi Tannamuri",
//       img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 6,
//       title: "Text based AI generated art",
//       price: 49.99,
//       buyer: "Giovanni Rovelli",
//       img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//   ];

//   return (
//     <div className="flex justify-center text-gray-700">
//       <div className="w-[1400px] py-12">
//         {/* Title Section */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Orders</h1>
//         </div>

//         {/* Table */}
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b text-sm">
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Title</th>
//               <th className="py-3 px-4 text-left">Price</th>
//               <th className="py-3 px-4 text-left">
//                 {currentUser.isSeller ? "Buyer" : "Seller"}
//               </th>
//               <th className="py-3 px-4 text-left">Contact</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr
//                 key={order.id}
//                 className={`${index % 2 === 0 ? "bg-green-50" : ""} border-b text-lg hover:bg-green-100 transition`}
//               >
//                 <td className="py-4 px-4">
//                   <img
//                     className="w-14 h-8 object-cover rounded-md shadow-sm"
//                     src={order.img}
//                     alt={order.title}
//                   />
//                 </td>
//                 <td className="py-4 px-4 font-medium text-gray-800">{order.title}</td>
//                 <td className="py-4 px-4 text-green-600 font-semibold">
//                   ${order.price.toFixed(2)}
//                 </td>
//                 <td className="py-4 px-4">{order.buyer}</td>
//                 <td className="py-4 px-4">
//                   <FontAwesomeIcon
//                     icon={faEnvelope}
//                     className="text-green-500 cursor-pointer text-xl hover:text-green-600 transition"
//                   />
//                 </td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        
        // Fetch orders once we have the current user ID
        fetchOrders(parsedUser.id);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        setError("Could not retrieve user information");
        setLoading(false);
      }
    } else {
      setError("No user found. Please log in.");
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/auth/orders/${userId}`);
      console.log(response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Please log in to view your orders</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center text-gray-700">
      <div className="w-full max-w-7xl py-12 px-4">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          <p>Welcome back, {currentUser.name}</p>
        </div>

        {/* No orders state */}
        {orders.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">No orders found</p>
          </div>
        )}

        {/* Table */}
        {orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-sm">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">
                    {currentUser.isSeller ? "Buyer" : "Seller"}
                  </th>
                  <th className="py-3 px-4 text-left">Contact</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  // Determine if the user is the seller (freelancer) or buyer (client)
                  const isSeller = currentUser.id === order.freelancer_id?._id || currentUser.id === order.freelancer_id;
                  const otherParty = isSeller 
                    ? (order.client_id?.username || "Client") 
                    : (order.freelancer_id?.username || "Freelancer");
                  
                  return (
                    <tr
                      key={order._id}
                      className={`${index % 2 === 0 ? "bg-green-50" : ""} border-b text-lg hover:bg-green-100 transition`}
                    >
                      <td className="py-4 px-4">
                        <img
                          className="w-14 h-8 object-cover rounded-md shadow-sm"
                          src={order.gig_id?.images?.[0] || "https://via.placeholder.com/150"}
                          alt={order.gig_id?.title || "Gig image"}
                        />
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {order.gig_id?.title || "Untitled Gig"}
                      </td>
                      <td className="py-4 px-4 text-green-600 font-semibold">
                        ${order.total_amount?.toFixed(2) || order.gig_id?.price?.toFixed(2) || "0.00"}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`py-1 px-3 rounded-full text-sm font-medium
                          ${order.status === "Completed" ? "bg-green-100 text-green-800" : 
                            order.status === "Cancelled" ? "bg-red-100 text-red-800" : 
                            "bg-yellow-100 text-yellow-800"}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4">{otherParty}</td>
                      <td className="py-4 px-4">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-green-500 cursor-pointer text-xl hover:text-green-600 transition"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;