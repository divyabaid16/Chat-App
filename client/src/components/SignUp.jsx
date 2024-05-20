import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import styled from "styled-components";
import { SERVER_URL } from "../util";

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
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  return (
    <>
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
    </>
  );
};

export default SignUp;
