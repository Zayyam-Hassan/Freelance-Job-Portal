import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MyGigs = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  return (
    <div className="flex justify-center text-gray-700">
      <div className="w-[1400px] py-12">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{currentUser.isSeller ? "Gigs" : "Orders"}</h1> 
          {/* ↑ Increased font size */}
          {currentUser.isSeller && (
            <Link to="/addGig">
              <button className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition">
                Add New Gig
              </button>
            </Link>
          )}
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-sm"> 
              {/* ↑ Increased font size in header */}
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Sales</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-green-50" : ""} border-b text-lg hover:bg-green-100 transition`}
              >
                {/* ↑ Increased font size in rows & added hover effect */}
                <td className="py-4 px-4">  
                  {/* ↑ Increased row height (was py-3, now py-4) */}
                  <img
                    className="w-14 h-8 object-cover rounded-md shadow-sm"
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Gig"
                  />
                </td>
                <td className="py-4 px-4 font-medium text-gray-800">Stunning Concept Art</td>
                <td className="py-4 px-4 text-green-600 font-semibold">
                  $59.<sup className="text-xs">99</sup>
                </td>
                <td className="py-4 px-4 text-center font-medium">13</td>
                <td className="py-4 px-4">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 cursor-pointer text-xl hover:text-red-700 transition"
                  />
                  {/* ↑ Increased delete icon size (was text-lg, now text-xl) */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
