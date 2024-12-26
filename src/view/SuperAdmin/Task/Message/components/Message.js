import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Wallpaper from "../images/wallpaper.png";
import { useDispatch, useSelector } from "react-redux";
import { getChatByTaskId, getUserStatus, postChat } from "../store/dataSlice";
import { useLocation } from "react-router-dom";
import profile from "./image/profile.jpg";

const ChatPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const selectedChat = useSelector((state) => state.task.state.selectedChat);
  const userID = useSelector((state) => state.auth.user.user_id);

  const chatMessage = useSelector((state) => state.chat.data.chatByIdList);
  const userStatus = useSelector((state) => state.chat.data.userSatus);

  const socket = useSelector((state) => state.socket.instance);

  const record = location.state?.record;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    dispatch(getChatByTaskId({ task_id: record.task_id }));
    dispatch(getUserStatus({ user_id: record.assigned_to }));
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;

    const handleReply = (message) => {
      console.log("Received message:", message);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          task_id: message.data?.task_id || null,
          receiver_id: message.data?.receiver_id || null,
          sender_id: message.data?.sender_id || null,
          message: message.data?.message || "",
        },
      ]);
    };

    socket.on("Reply", handleReply);

    return () => {
      socket.off("Reply", handleReply);
    };
  }, [socket]);

  useEffect(() => {
    if (chatMessage) {
      setMessages(chatMessage);
    }
  }, [chatMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const userMessage = {
      task_id: record.task_id,
      receiver_id:
        record.assigned_to === userID ? record.assigned_by : record.assigned_to,
      sender_id: userID,
      message: newMessage,
    };

    dispatch(postChat({ ...userMessage }));
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-80 max-w-lg mx-auto bg-white rounded-lg overflow-hidden">
      <header className="p-4 bg-green-600 text-white text-lg font-semibold flex items-center shadow-md">
        <div className="flex items-center">
          <img
            src={profile}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-2"
          />
          <div>
            <span>
              {record.assigned_to === userID
                ? `${record["AssignedBy.name"]}`
                : `${record["AssignedTo.name"]}`}
            </span>
            <br />
            <span className="text-sm">{userStatus}</span>
          </div>
        </div>
      </header>

      <main
        ref={messagesEndRef}
        className="flex-1 overflow-y-auto p-4 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${Wallpaper})`,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender_id === userID ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-white ${
                message.sender_id === userID
                  ? "bg-green-500 text-right"
                  : "bg-green-500 text-black"
              } transition duration-200 ease-in-out shadow-md ${
                message.sender_id === userID
                  ? "round-l text-left"
                  : "round-r text-left"
              }`}
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.message}
            </div>
          </div>
        ))}
      </main>

      <footer className="p-4 w-full bg-gray-100 border-t shadow-md flex justify-between gap-2">
        <div className="w-95 border border-gray-300 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full h-full p-4 focus-outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
        <div className="flex justify-center text-xl rounded-full bg-green-600 text-white w-12 h-12 hover:bg-green-700 transition duration-200">
          <button onClick={handleSendMessage} className="">
            <IoMdSend />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
