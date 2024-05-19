// GroupChat.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { SERVER_URL, getCurrentUserId, userId } from "../util";

const GroupChat = () => {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchEarlierMessages();

    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [groupId]);

  const fetchEarlierMessages = async () => {
    const response = await fetch(`${SERVER_URL}/api/messages/${groupId}`);
    if (response.status !== 200) {
      const errorMessage = `Failed to fetch messages. Status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    setMessages(data.messages);
  };

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      socket.emit("message", {
        groupId,
        messageString: messageInput,
        sender: getCurrentUserId(),
      });
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Group Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.messageString}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GroupChat;
