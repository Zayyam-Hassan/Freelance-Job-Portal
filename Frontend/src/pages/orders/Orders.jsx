import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const orders = [
    {
      id: 1,
      title: "Stunning concept art",
      price: 59.99,
      buyer: "Maria Anders",
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      title: "AI generated concept art",
      price: 79.99,
      buyer: "Francisco Chang",
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      title: "High quality digital character",
      price: 110.99,
      buyer: "Roland Mendel",
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 4,
      title: "Illustration hyper realistic painting",
      price: 39.99,
      buyer: "Helen Bennett",
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 5,
      title: "Original AI generated digital art",
      price: 119.99,
      buyer: "Yoshi Tannamuri",
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 6,
      title: "Text based AI generated art",
      price: 49.99,
      buyer: "Giovanni Rovelli",
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div className="flex justify-center text-gray-700">
      <div className="w-[1400px] py-12">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-sm">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">
                {currentUser.isSeller ? "Buyer" : "Seller"}
              </th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${index % 2 === 0 ? "bg-green-50" : ""} border-b text-lg hover:bg-green-100 transition`}
              >
                <td className="py-4 px-4">
                  <img
                    className="w-14 h-8 object-cover rounded-md shadow-sm"
                    src={order.img}
                    alt={order.title}
                  />
                </td>
                <td className="py-4 px-4 font-medium text-gray-800">{order.title}</td>
                <td className="py-4 px-4 text-green-600 font-semibold">
                  ${order.price.toFixed(2)}
                </td>
                <td className="py-4 px-4">{order.buyer}</td>
                <td className="py-4 px-4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-green-500 cursor-pointer text-xl hover:text-green-600 transition"
                  />
                </td>
                <td className="py-4 px-4">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 cursor-pointer text-xl hover:text-red-700 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
