import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import styled from "styled-components";
import { SERVER_URL } from "../util";

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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${SERVER_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sign up failed");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful signup
        console.log(data);
      })
      .catch((error) => {
        // Handle signup error
        console.error(error);
      });
  };

  return (
    <AuthForm>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <TextField
            fullWidth
            label="Username"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        </FormItem>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </AuthForm>
  );
};

export default SignUp;
