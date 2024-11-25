import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Wallpaper from "../images/wallpaper.png";
import { useDispatch, useSelector } from "react-redux";
import { getChatByTaskId } from "../store/dataSlice";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { PERSIST_STORE_NAME } from "../../../../../constants/app.constant";
import deepParseJson from "../../../../../utils/deepParseJson";

const ChatPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const selectedChat = useSelector((state) => state.task.state.selectedChat);
  const userID = useSelector((state) => state.auth.user.user_id);
  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
  const persistData = deepParseJson(rawPersistData);

  let accessToken = persistData.auth.session.token;

  const chatMessage = useSelector((state) => state.chat.data.chatByIdList);

  const record = location.state?.record;

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let newSocket;

    const initializeSocket = () => {
      newSocket = io("https://710f-103-158-91-217.ngrok-free.app", {
        auth: {
          token: `Bearer ${accessToken}`,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected");
      });

      newSocket.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
      });
    };

    initializeSocket();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    dispatch(getChatByTaskId({ task_id: record.task_id }));
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (chatMessage) {
      setMessages(chatMessage);
    }
  }, [chatMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: userID,
      chat_id: record?.task_id,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    socket.emit("send_message", userMessage);
    setNewMessage("");

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-80 max-w-lg mx-auto bg-white rounded-lg overflow-hidden">
      <header className="p-4 bg-green-600 text-white text-lg font-semibold text-center shadow-md">
        Chat Support
      </header>

      <main
        className="flex-1 overflow-y-auto p-4 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${Wallpaper})`,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === userID ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-white ${
                message.sender === userID
                  ? "bg-green-500 text-right"
                  : "bg-green-500 text-black"
              } transition duration-200 ease-in-out shadow-md ${
                message.sender === "user" ? "round-l" : "round-r"
              }`}
            >
              {message.text}
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
