// Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Home, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <AppBar position="static" sx={{ height: "7vh" }}>
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          onClick={() => navigate(isLoggedIn ? "/" : "/auth")}
        >
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BuzzChat
        </Typography>
        {isLoggedIn && (
          <Button
            color="inherit"
            endIcon={<ExitToApp />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
