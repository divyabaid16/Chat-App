import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

function Authentication() {
  const [value, setValue] = useState("signIn");

  const handleChange = (e, value) => {
    setValue(value);
  };

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
      <>
        {value === "signIn" && <SignIn />}
        {value === "signUp" && <SignUp />}
      </>
    </>
  );
}

export default Authentication;
