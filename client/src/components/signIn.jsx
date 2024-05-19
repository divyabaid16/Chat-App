import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import styled from "styled-components";
import { SERVER_URL, getUserIdFromAuthToken } from "../util";

const AuthForm = styled(Box)`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

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

  const onSubmit = (data) => {
    axios
      .post(`${SERVER_URL}/api/users/signin`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          // withCredentials: true,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const authToken = response.data.token;
          localStorage.setItem("authToken", authToken);

          const userId = getUserIdFromAuthToken(authToken);
          console.log("Logged in user ID:", userId);

          navigate("/groups");
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
          console.error("Error response:", error.response);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  return (
    <AuthForm>
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
    </AuthForm>
  );
};

export default SignIn;
