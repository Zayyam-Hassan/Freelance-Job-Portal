import React from "react";

const Add = () => {
  return (
    <div className="flex justify-center bg-gray-100 pt-28 pb-20 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-lg p-10 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          Add New Gig
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section - Gig Information */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-600 font-medium">Title</label>
              <input
                type="text"
                placeholder="e.g. I will create an amazing website"
                className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">Category</label>
              <select className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400">
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 font-medium">Cover Image</label>
              <input type="file" className="w-full mt-2 p-2 border rounded-md" />
            </div>

            <div>
              <label className="text-gray-600 font-medium">Upload Images</label>
              <input type="file" multiple className="w-full mt-2 p-2 border rounded-md" />
            </div>

            <div>
              <label className="text-gray-600 font-medium">Description</label>
              <textarea
                placeholder="Brief description of your service"
                className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                rows="8"
              ></textarea>
            </div>
          </div>

          {/* Right Section - Gig Details */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-600 font-medium">Service Title</label>
              <input
                type="text"
                placeholder="e.g. One-page web design"
                className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">Short Description</label>
              <textarea
                placeholder="Short service description"
                className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                rows="4"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-gray-600 font-medium">Delivery Time</label>
                <input
                  type="number"
                  placeholder="e.g. 3 days"
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Revisions</label>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Gig Extras - Single Row with Name & Price */}
            <div>
              <label className="text-gray-600 font-medium">Gig Extra</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="e.g. Extra fast delivery (1 day)"
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 font-medium">Price</label>
              <input
                type="number"
                placeholder="e.g. $50"
                className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>

        {/* Create Gig Button */}
        <div className="flex justify-center mt-10">
          <button className="w-full max-w-md bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition text-lg font-semibold">
            Create Gig
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
