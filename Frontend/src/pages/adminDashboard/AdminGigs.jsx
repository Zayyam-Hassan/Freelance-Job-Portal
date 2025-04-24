import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import GigCard from "../../components/gigCard/GigCard";
import axios from "axios";

const AdminGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        // Using axios with the correct endpoint; no query parameters for now
        const params = {};
        const response = await axios.get("http://localhost:3000/api/auth/gigs", { params });
        
        if (response.status !== 200) {
          throw new Error("Failed to fetch gigs");
        }
        // Extract the gigs array from the response object
        setGigs(response.data.gigs);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching gigs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    // Sum all ratings
    const sum = reviews.reduce((total, review) => {
      return total + (review.rating || 0);
    }, 0);
    
    // Calculate average
    return sum / reviews.length;
  };

  // Filter gigs based on search criteria
  const filteredGigs = gigs.filter(gig => {
    const matchesTitle = searchTitle
      ? gig.title?.toLowerCase().includes(searchTitle.toLowerCase()) ||
        gig.description?.toLowerCase().includes(searchTitle.toLowerCase())
      : true;
    
      const categoryLower = selectedCategory?.toLowerCase();

      const matchesCategory = selectedCategory
        ? gig.category?.toLowerCase().includes(categoryLower) ||
          gig.gig_tags?.some(tag => tag.toLowerCase().includes(categoryLower))
        : true;
    
    // Calculate average rating for this gig
    const avgRating = calculateAverageRating(gig.reviews || []);
    
    const matchesRating = selectedRating
      ? avgRating >= parseInt(selectedRating)
      : true;
    
    return matchesTitle && matchesCategory && matchesRating;
  });

  return (
    <div>
      {/* Top Bar / Filters */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Gigs</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          {/* Search by Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter gig title"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400 pr-8"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <Search size={16} className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="frontend">Frontend </option>
              <option value="backend">Backend </option>
              <option value="fullstack">Website Development</option>
              <option value="graphics-design">Graphics Design</option>
              <option value="content-writing">Content Writing</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="video-editing">Video Editing</option>
              <option value="audio-production">Audio Production</option>
            </select>
          </div>
          
          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="4">4 & above</option>
              <option value="3">3 & above</option>
              <option value="2">2 & above</option>
              <option value="1">1 & above</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading, Error, and Empty States */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading gigs...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <p>Error: {error}</p>
          <button 
            className="mt-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredGigs.length === 0 && (
        <div className="text-center py-8 bg-white rounded shadow">
          <Filter size={40} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">No gigs match your filter criteria.</p>
        </div>
      )}

      {/* Gigs Grid Container using GigCard component */}
      {!loading && !error && filteredGigs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGigs.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGigs;