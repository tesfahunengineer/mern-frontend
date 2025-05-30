import { useEffect, useState } from "react";
import axios from "axios";
import { BottomNavBar } from "../../../components/BottomNavBar.jsx";
import { TopNavBarWithLogout } from "../../../components/TopNavBarWithLogout.jsx";
import { Sidebar } from "../../../components/Sidebar/AdminSidebar.jsx";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null); // For the modal
  const [showModal, setShowModal] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("https://mern-backend-qsew.onrender.com/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`https://mern-backend-qsew.onrender.com/api/contact/mark-as-read/${id}`);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err.message);
    }
  };

  const openModal = (msg) => {
    setSelectedMessage(msg);
    setShowModal(true);
    if (!msg.read) markAsRead(msg._id); // Mark as read when clicked
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        <span className="ml-4 text-indigo-600 text-lg font-medium">
          Loading messages...
        </span>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <TopNavBarWithLogout />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 mt-4 lg:ml-64">
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
            All Customer Messages
          </h2>

          {messages.length === 0 ? (
            <p className="text-center text-gray-600">No messages found.</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-4 border rounded-lg shadow-sm ${
                    msg.read
                      ? "bg-white border-gray-300"
                      : "bg-red-50 border-red-300"
                  }`}
                  onClick={() => openModal(msg)} // Open modal on click
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">From: {msg.name}</p>
                    {!msg.read && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{msg.email}</p>
                  <p className="mt-2 font-medium text-indigo-700">
                    Subject: {msg.subject}
                  </p>
                  <p className="mt-1 text-gray-800">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal for message details */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center px-4 sm:px-6 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96 relative">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-indigo-600">
                {selectedMessage.subject}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
              From: {selectedMessage.name}
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Email: {selectedMessage.email}
            </p>
            <p className="mt-4 text-gray-800 dark:text-gray-200">
              {selectedMessage.message}
            </p>

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default MessagesList;
