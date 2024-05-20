import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getCurrentUserId } from "../util";

const Message = ({ message }) => {
  const isMyMessage = message.sender === getCurrentUserId();
  const messageTime = new Date(message.dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Box
      display="flex"
      justifyContent={isMyMessage ? "flex-end" : "flex-start"}
      mb={2}
      margin="2em"
    >
      <Paper
        elevation={3}
        sx={{
          minWidth: "200px",
          maxWidth: "60%",
          padding: "8px",
          borderRadius: "10px",
          backgroundColor: isMyMessage ? "#EEEDEB" : "#FFFFFF",
        }}
      >
        {!isMyMessage && (
          <Typography variant="body1" color="primary" fontWeight="bold">
            {message.username}
          </Typography>
        )}
        <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
          {message.messageString}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          textAlign="right"
          color="textSecondary"
        >
          {messageTime}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Message;
