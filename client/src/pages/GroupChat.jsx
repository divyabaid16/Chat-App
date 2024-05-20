import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";
import { SERVER_URL, getCurrentUserId } from "../util";
import Message from "../components/Message";
import {
  Box,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const GroupChat = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
  });
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    fetchEarlierMessages();
    getGroupDetails();

    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", groupId);
    });

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("userTyping", ({ userId, username, isTyping }) => {
      if (!isTyping) {
        setTypingUsers((prevUsers) =>
          prevUsers.filter((user) => user !== username)
        );
        return;
      }
      if (userId !== getCurrentUserId()) {
        setTypingUsers((prevUsers) => {
          if (!prevUsers.includes(username)) {
            return [...prevUsers, username];
          }
          return prevUsers;
        });
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleEmojiClick = (event) => {
    setMessageInput(messageInput + event.emoji);
  };

  const getGroupDetails = () => {
    fetch(`${SERVER_URL}/api/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          const errorMessage = `Failed to fetch group details. Status: ${response.status}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data) => {
        setGroupDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching group details:", error);
      });
  };

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
        dateTime: new Date().toISOString(),
      });
      setMessageInput("");
    }
  };

  const sendTypingEvent = (isTyping) => {
    if (socket) {
      const typingEventData = {
        groupId,
        userId: getCurrentUserId(),
        isTyping,
      };

      socket.emit("userTyping", typingEventData);
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = new Date(message.dateTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {});
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") {
      sendTypingEvent(true);
      setShowEmojiPicker(false);

      setTimeout(() => {
        sendTypingEvent(false);
      }, 3000);
    } else {
      e.preventDefault();
      if (messageInput.trim() !== "") {
        sendMessage(messageInput.trim());
        setMessageInput("");
      }
      setShowEmojiPicker(false);
      sendTypingEvent(false);
    }
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <Container
      style={{
        padding: "0px",
        border: "1px solid #000",
      }}
    >
      <AppBar position="static" sx={{ color: "black", background: "#f3f4f6" }}>
        <Toolbar sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h6" fontWeight="bold">
            {groupDetails.name}
          </Typography>
          <Typography variant="body2" noWrap>
            {groupDetails.description}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        ref={messageContainerRef}
        display="flex"
        flexDirection="column"
        height="70vh"
        overflow="auto"
        mb={2}
        sx={{
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {Object.keys(groupedMessages).map((date) => (
          <div key={date}>
            <Typography variant="subtitle1" align="center">
              {date}
            </Typography>
            {groupedMessages[date].map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>
        ))}
      </Box>
      {typingUsers.length > 0 && (
        <Box mt={1}>
          <Typography variant="body2">
            {typingUsers.length === 1
              ? `${typingUsers[0]} is typing...`
              : `${typingUsers.length} people are typing...`}
          </Typography>
        </Box>
      )}
      <Box display="flex">
        <TextField
          fullWidth
          variant="outlined"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message"
          onKeyDown={handleKeyPress}
          sx={{ mr: 1 }}
        />
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <EmojiEmotionsIcon />
        </IconButton>
        {showEmojiPicker && (
          <Box
            sx={{
              position: "absolute",
              bottom: "50px",
              right: "60px",
              zIndex: 10,
            }}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} ref={emojiPickerRef} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default GroupChat;
