// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// const MyGigs = () => {
//   const currentUser = {
//     id: 1,
//     username: "Anna",
//     isSeller: true,
//   };

//   return (
//     <div className="flex justify-center text-gray-700">
//       <div className="w-[1400px] py-12">
//         {/* Title Section */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">{currentUser.isSeller ? "Gigs" : "Orders"}</h1> 
//           {/* ↑ Increased font size */}
//           {currentUser.isSeller && (
//             <Link to="/addGig">
//               <button className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition">
//                 Add New Gig
//               </button>
//             </Link>
//           )}
//         </div>

//         {/* Table */}
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b text-sm"> 
//               {/* ↑ Increased font size in header */}
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Title</th>
//               <th className="py-3 px-4 text-left">Price</th>
//               <th className="py-3 px-4 text-left">Sales</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...Array(6)].map((_, index) => (
//               <tr
//                 key={index}
//                 className={`${index % 2 === 0 ? "bg-green-50" : ""} border-b text-lg hover:bg-green-100 transition`}
//               >
//                 {/* ↑ Increased font size in rows & added hover effect */}
//                 <td className="py-4 px-4">  
//                   {/* ↑ Increased row height (was py-3, now py-4) */}
//                   <img
//                     className="w-14 h-8 object-cover rounded-md shadow-sm"
//                     src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                     alt="Gig"
//                   />
//                 </td>
//                 <td className="py-4 px-4 font-medium text-gray-800">Stunning Concept Art</td>
//                 <td className="py-4 px-4 text-green-600 font-semibold">
//                   $59.<sup className="text-xs">99</sup>
//                 </td>
//                 <td className="py-4 px-4 text-left font-medium">13</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyGigs;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get currentUser from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchMyGigs = async () => {
    if (!currentUser || !currentUser.id) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/auth/gigs/freelancer/${currentUser.id}`);
      
      if (response.data && response.data.gigs) {
        setGigs(response.data.gigs);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching gigs:", err);
      setError("Failed to load gigs. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, [currentUser]);

  const handleDeleteGig = async (gigId) => {
    if (!currentUser || !currentUser.id) return;
    
    try {
      setDeleteLoading(true);
      
      // Call the delete API endpoint
      await axios.delete(`http://localhost:3000/api/auth/gig/${gigId}`
      );
      
      // If successful, update the state to remove the deleted gig
      setGigs(prevGigs => prevGigs.filter(gig => gig._id !== gigId));
      
      setDeleteLoading(false);
      alert("Gig deleted successfully!");
    } catch (err) {
      console.error("Error deleting gig:", err);
      setDeleteLoading(false);
      alert(err.response?.data?.error || "Failed to delete gig. Please try again.");
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Please log in to view your gigs.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center text-gray-700">
      <div className="w-[1400px] py-12">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/addGig">
              <button className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition">
                Add New Gig
              </button>
            </Link>
          )}
        </div>

        {/* Table */}
        {gigs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl">You don't have any gigs yet.</p>
            {currentUser.isSeller && (
              <Link to="/addGig" className="text-green-500 hover:underline mt-2 inline-block">
                Create your first gig
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-sm">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Sales</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig, index) => (
                <tr
                  key={gig._id}
                  className={`${index % 2 === 0 ? "bg-green-50" : ""} border-b text-lg hover:bg-green-100 transition`}
                >
                  <td className="py-4 px-4">
                    <img
                      className="w-14 h-8 object-cover rounded-md shadow-sm"
                      src={gig.cover_image || "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                      alt={gig.title}
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">{gig.title}</td>
                  <td className="py-4 px-4 text-green-600 font-semibold">
                    ${gig.price}.<sup className="text-xs">99</sup>
                  </td>
                  <td className="py-4 px-4 text-left font-medium">{gig.sales || 0}</td>
                  <td className="py-4 px-4">
                    <Link to={`/gig/${gig._id}`} className="text-blue-500 hover:underline mr-4">
                      View
                    </Link>
                    <button 
                      className="text-red-500 hover:underline"
                      disabled={deleteLoading}
                      onClick={() => {
                        if(window.confirm("Are you sure you want to delete this gig?")) {
                          handleDeleteGig(gig._id);
                        }
                      }}
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyGigs;