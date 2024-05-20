import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SERVER_URL, userId } from "../util";

const CreateGroup = ({ open, handleClose, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = () => {
    const data = { name: groupName, description, createdBy: userId };

    fetch(`${SERVER_URL}/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create group");
        }
      })
      .then((group) => {
        console.log("Group created:", group);
        setGroupName("");
        setDescription("");
        onGroupCreated(group);
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating group:", error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of the new group:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Group Name"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateGroup} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroup;
