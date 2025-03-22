import React from "react";
import { Link } from "react-router-dom";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  const messagesData = [
    { id: '67d9aae89ed4c79a67e5506a', name: "Charley Sharp", time: "1 hour ago", active: true },
    { id: 2, name: "John Doe", time: "2 hours ago", active: true },
    { id: 3, name: "Elinor Good", time: "1 day ago", active: false },
    { id: 4, name: "Garner David", time: "2 days ago", active: false },
    { id: 5, name: "Troy Oliver", time: "1 week ago", active: false },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl mx-8 my-12">
        {/* Title */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">Messages</h1>
        </div>

        {/* Messages Table */}
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th className="text-left p-4">Last Message</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {messagesData.map(({ id, name, time, active }) => (
                <tr key={id} className={`${active ? "bg-green-50" : "bg-white"} hover:bg-gray-100 transition-all`}>
                  <td className="p-4 font-medium">{name}</td>
                  <td className="p-4 text-gray-600">
                    <Link to={`/message/${id}`} className="text-blue-600 hover:underline">
                      {message.substring(0, 100)}...
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500">{time}</td>
                  <td className="p-4">
                    {active && (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;
