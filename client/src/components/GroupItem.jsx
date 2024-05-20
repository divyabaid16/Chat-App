import React from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { SERVER_URL, userId } from "../util";

const GroupItem = ({ group, onDelete }) => {
  const navigate = useNavigate();

  const handleGroupClick = () => {
    navigate(`/group/${group._id}`);
  };

  const handleDelete = () => {
    fetch(`${SERVER_URL}/api/groups/${group._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          onDelete(group.groupId);
          return response.json();
        } else {
          throw new Error("Failed to delete group");
        }
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error deleting group:", error);
      });
  };

  return (
    <Card elevation={3} style={{ height: "150px" }}>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "8px" }}>
          <Typography
            variant="h5"
            component="h2"
            onClick={handleGroupClick}
            style={{ cursor: "pointer" }}
          >
            {group.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {group.description}
          </Typography>
        </div>
        {userId === group.createdBy && (
          <div style={{ marginLeft: "auto" }}>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <Delete style={{ color: "red" }} />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupItem;
