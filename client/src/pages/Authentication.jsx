import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styled from "styled-components";

function Authentication() {
  const [value, setValue] = useState("signIn");

  const handleChange = (e, value) => {
    setValue(value);
  };

  const AuthForm = styled(Box)`
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
  `;

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary"
        centered
      >
        <Tab value="signIn" label="Sign In" />
        <Tab value="signUp" label="Sign Up" />
      </Tabs>
      <AuthForm>
        {value === "signIn" && <SignIn />}
        {value === "signUp" && <SignUp />}
      </AuthForm>
    </>
  );
}

export default Authentication;
