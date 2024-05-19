import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GroupItem = ({ group }) => {
  const navigate = useNavigate();

  const handleGroupClick = () => {
    navigate(`/chat/${group._id}`);
  };

  return (
    <Card
      elevation={3}
      onClick={handleGroupClick}
      style={{ cursor: "pointer" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {group.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {group.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupItem;
