import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import styled from "styled-components";
import { SERVER_URL, getUserIdFromAuthToken } from "../util";
import { useAuth } from "../util/AuthContext";

const FormItem = styled(Box)`
  margin-bottom: 20px;
`;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = (data) => {
    fetch(`${SERVER_URL}/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const authToken = data.token;
          localStorage.setItem("authToken", authToken);

          const userId = getUserIdFromAuthToken(authToken);
          console.log("Logged in user ID:", userId);
          login();
          navigate("/");
        } else {
          throw new Error(data.message || "Login failed");
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <TextField
            fullWidth
            label="Email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        </FormItem>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignIn;
