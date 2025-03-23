// import React, { useRef, useState } from "react";
// import { gigs } from "../../data";
// import GigCard from "../../components/gigCard/GigCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// const Gigs = () => {
//   const [sort, setSort] = useState("sales");
//   const [open, setOpen] = useState(false);
//   const minRef = useRef();
//   const maxRef = useRef();

//   const reSort = (type) => {
//     setSort(type);
//     setOpen(false);
//   };

//   const apply = () => {
//     console.log(minRef.current.value);
//     console.log(maxRef.current.value);
//   };

//   return (
//     <div className="flex justify-center w-full text-gray-800 ">
//       <div className="w-[1400px] py-8 flex flex-col gap-4">
//         {/* Breadcrumbs */}
//         <span className="uppercase text-xs text-gray-500 tracking-wide">
//           Liverr &gt; Graphics & Design &gt;
//         </span>

//         {/* Page Title */}
//         <h1 className="text-3xl font-bold">AI Artists</h1>
//         <p className="text-gray-500 font-light">
//           Explore the boundaries of art and technology with Liverr's AI artists
//         </p>

//         {/* Filter & Sorting Menu */}
//         <div className="flex justify-between items-center mb-6">
//           {/* Budget Filter */}
//           <div className="flex items-center gap-3 text-gray-600 text-sm">
//             <span>Budget</span>
//             <input
//               ref={minRef}
//               type="number"
//               placeholder="Min"
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <input
//               ref={maxRef}
//               type="number"
//               placeholder="Max"
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <button
//               onClick={apply}
//               className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
//             >
//               Apply
//             </button>
//           </div>

//           {/* Sort Dropdown */}
//           <div className="relative flex items-center gap-3 text-gray-600 text-sm">
//             <span className="font-light">Sort by</span>
//             <span className="font-medium">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            
//             {/* FontAwesome Dropdown Icon */}
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               className="text-gray-500 cursor-pointer hover:text-green-500 transition"
//               onClick={() => setOpen(!open)}
//             />

//             {/* Dropdown Menu */}
//             {open && (
//               <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-md shadow-md p-4 z-10 flex flex-col gap-2">
//                 <span
//                   onClick={() => reSort("createdAt")}
//                   className="cursor-pointer hover:text-green-500"
//                 >
//                   Newest
//                 </span>
//                 <span
//                   onClick={() => reSort("sales")}
//                   className="cursor-pointer hover:text-green-500"
//                 >
//                   Best Selling
//                 </span>
//                 <span
//                   onClick={() => reSort("sales")}
//                   className="cursor-pointer hover:text-green-500"
//                 >
//                   Popular
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Gig Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {gigs.map((gig) => (
//             <GigCard key={gig.id} item={gig} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gigs;
import React, { useRef, useState, useEffect } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Make sure axios is installed

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "Graphics & Design", // Default category
    tags: [], // If you want to filter by tags
    minPrice: "",
    maxPrice: ""
  });
  
  const minRef = useRef();
  const maxRef = useRef();

  // Fetch gigs when component mounts or filters change
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        
        // Construct query parameters
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.tags.length > 0) params.tags = filters.tags.join(",");
        
        const response = await axios.get("http://localhost:3000/api/auth/gigs", { params });
        
        // Sort the results based on current sort preference
        let sortedGigs = [...response.data.gigs];
        if (sort === "sales") {
          sortedGigs.sort((a, b) => b.sales - a.sales);
        } else if (sort === "createdAt") {
          sortedGigs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        // Apply price filter if set (client-side)
        if (filters.minPrice && filters.maxPrice) {
          sortedGigs = sortedGigs.filter(
            gig => gig.price >= filters.minPrice && gig.price <= filters.maxPrice
          );
        } else if (filters.minPrice) {
          sortedGigs = sortedGigs.filter(gig => gig.price >= filters.minPrice);
        } else if (filters.maxPrice) {
          sortedGigs = sortedGigs.filter(gig => gig.price <= filters.maxPrice);
        }
        
        setGigs(sortedGigs);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch gigs:", err);
        setError("Failed to load gigs. Please try again later.");
        setLoading(false);
      }
    };

    fetchGigs();
  }, [filters.category, filters.tags, sort]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    const minPrice = minRef.current.value;
    const maxPrice = maxRef.current.value;
    
    setFilters(prev => ({
      ...prev,
      minPrice,
      maxPrice
    }));
  };

  return (
    <div className="flex justify-center w-full text-gray-800">
      <div className="w-[1400px] py-8 flex flex-col gap-4">
        {/* Breadcrumbs */}
        <span className="uppercase text-xs text-gray-500 tracking-wide">
          Liverr &gt; Graphics & Design &gt;
        </span>

        {/* Page Title */}
        <h1 className="text-3xl font-bold">AI Artists</h1>
        <p className="text-gray-500 font-light">
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>

        {/* Filter & Sorting Menu */}
        <div className="flex justify-between items-center mb-6">
          {/* Budget Filter */}
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <span>Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="Min"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="Max"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={apply}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
            >
              Apply
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center gap-3 text-gray-600 text-sm">
            <span className="font-light">Sort by</span>
            <span className="font-medium">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            
            {/* FontAwesome Dropdown Icon */}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-gray-500 cursor-pointer hover:text-green-500 transition"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-md shadow-md p-4 z-10 flex flex-col gap-2">
                <span
                  onClick={() => reSort("createdAt")}
                  className="cursor-pointer hover:text-green-500"
                >
                  Newest
                </span>
                <span
                  onClick={() => reSort("sales")}
                  className="cursor-pointer hover:text-green-500"
                >
                  Best Selling
                </span>
                <span
                  onClick={() => reSort("sales")}
                  className="cursor-pointer hover:text-green-500"
                >
                  Popular
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Loading, Error, and Empty States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading gigs...</p>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        
        {!loading && !error && gigs.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No gigs found matching your criteria.</p>
          </div>
        )}

        {/* Gig Cards Grid */}
        {!loading && !error && gigs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gigs.map((gig) => (
              <GigCard key={gig._id || gig.id} item={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;