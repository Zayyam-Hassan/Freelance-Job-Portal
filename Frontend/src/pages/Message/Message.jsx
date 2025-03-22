// import React from "react";
// import { Link } from "react-router-dom";

// const Message = () => {
//   return (
//     <div className="flex justify-center">
//       <div className="w-full max-w-5xl mx-8 my-12">
//         {/* Breadcrumbs */}
//         <span className="text-gray-500 text-sm font-light">
//           <Link to="/messages" className="hover:underline">Messages</Link> {">"} John Doe {">"}
//         </span>

//         {/* Messages Container */}
//         <div className="flex flex-col gap-5 p-6 my-6 h-[500px] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
//           {/* Message Items */}
//           {Array(8).fill("").map((_, index) => (
//             <div key={index} className={`flex gap-4 max-w-lg text-lg ${index % 2 !== 0 ? "flex-row-reverse self-end" : ""}`}>
//               <img
//                 src={index % 2 === 0 
//                   ? "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                   : "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 }
//                 alt="User"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <p className={`p-4 max-w-md rounded-lg text-gray-700 text-base leading-6 ${index % 2 === 0 ? "bg-gray-100 rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none"}`}>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate?
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <hr className="border-gray-300 mb-5"/>
//         <div className="flex items-center justify-between">
//           <textarea 
//             placeholder="Write a message..." 
//             className="w-4/5 h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button className="bg-green-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-600 transition-all">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Message = () => {
  const { id } = useParams();
  const receiverId = id;

  const sender = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = sender?.id || "YOUR_SENDER_ID";
  console.log("User ID:", userId, "Receiver ID:", receiverId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !receiverId) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/chat/${userId}/${receiverId}`
        );
        setMessages(response.data.chat || []);

        // Mark unread messages as read
        const unreadMessages = response.data.chat.filter(
          (msg) => msg.receiver_id === userId && !msg.is_read
        );

        unreadMessages.forEach(async (msg) => {
          try {
            await axios.put(`http://localhost:3000/api/auth/messages/${msg._id}/read`);
          } catch (error) {
            console.error("Error marking message as read:", error);
          }
        });
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, receiverId]);

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !userId || !receiverId) return;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/messages", {
        sender_id: userId,
        receiver_id: receiverId,
        content: newMessage,
      });

      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl mx-8 my-12">
        {/* Breadcrumbs */}
        <span className="text-gray-500 text-sm font-light">
          <Link to="/messages" className="hover:underline">
            Messages
          </Link>{" "}
          {">"} Receiver: {receiverId} {">"}
        </span>

        {/* Messages Container */}
        <div className="flex flex-col gap-5 p-6 my-6 h-[500px] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex gap-4 max-w-lg text-lg ${
                (msg.sender_id?._id || msg.sender_id) === userId
                  ? "flex-row-reverse self-end"
                  : ""
              }`}
            >
              <img
                src={
                  (msg.sender_id?._id || msg.sender_id) === userId
                    ? "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    : "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                }
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p
                className={`p-4 max-w-md rounded-lg text-gray-700 text-base leading-6 ${
                  (msg.sender_id?._id || msg.sender_id) === userId
                    ? "bg-gray-100 rounded-tl-none"
                    : "bg-blue-600 text-white rounded-tr-none"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <hr className="border-gray-300 mb-5" />
        <div className="flex items-center justify-between">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-4/5 h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-600 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
