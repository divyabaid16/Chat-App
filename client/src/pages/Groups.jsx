import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../util";
import GroupItem from "../components/GroupItem";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import CreateGroup from "../components/CreateGroup";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

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
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.groupId !== groupId)
    );
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Container>
        <Box display="flex" alignItems="center">
          <h1>Welcome to Groups!</h1>
          <IconButton
            aria-label="create group"
            onClick={handleOpenDialog}
            style={{
              backgroundColor: "#f50057",
              color: "#fff",
              marginLeft: "auto",
            }}
          >
            <Add />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {groups.map((group) => (
            <Grid item key={group.groupId} xs={12} sm={6} md={4}>
              <GroupItem group={group} onDelete={handleDeleteGroup} />
            </Grid>
          ))}
        </Grid>
        <CreateGroup
          open={openDialog}
          handleClose={handleCloseDialog}
          onGroupCreated={handleCreateGroup}
        />
      </Container>
    </div>
  );
};

export default Groups;
