import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../util";
import GroupItem from "../components/GroupItem";
import { Grid, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import CreateGroup from "../components/CreateGroup";

const Groups = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groups, setGroups] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    checkAuthenticationStatus();
    fetchGroups();
  }, []);

  const checkAuthenticationStatus = () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/auth");
    }
  };

  const fetchGroups = () => {
    fetch(`${SERVER_URL}/api/groups`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch groups");
        }
      })
      .then((data) => {
        setGroups(data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  };

  const handleCreateGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]); // Add the new group to the list
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div>
      {isLoggedIn && (
        <>
          <h1>Welcome to Groups!</h1>
          <IconButton
            aria-label="create group"
            onClick={handleOpenDialog}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#f50057",
              color: "#fff",
            }}
          >
            <Add />
          </IconButton>
          <Grid container spacing={2}>
            {groups.map((group) => (
              <Grid item key={group.groupId} xs={12} sm={6} md={4}>
                <GroupItem group={group} />
              </Grid>
            ))}
          </Grid>
          <CreateGroup
            open={openDialog}
            handleClose={handleCloseDialog}
            onGroupCreated={handleCreateGroup}
          />
        </>
      )}
    </div>
  );
};

export default Groups;
