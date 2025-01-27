import React from "react";
import "../styles/Auth.css";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/Api";
import { notify } from "../utils/notification";

const Signup = () => {
  const method = useForm();
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        notify("success", data.message);
      }
    },
  });
  const onsubmit = (data) => {
    signupMutation.mutate(data);
  };
  return (
    <div>
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <form class="auth" onSubmit={method.handleSubmit(onsubmit)}>
              <div class="auth__field">
                <i class="auth__icon fas fa-user"></i>
                <CustomTextInput
                  name="username"
                  label="User Name"
                  placeHolder="Enter your username"
                  control={method.control}
                  rules={{ required: "Username is required" }}
                />
              </div>
              <CustomTextInput
                name="email"
                label="Email"
                type="email"
                placeHolder="Enter your email"
                control={method.control}
                rules={{ required: "Email is required" }}
              />
              <div class="auth__field">
                <i class="auth__icon fas fa-lock"></i>
                <CustomTextInput
                  name="password"
                  label="Password"
                  type="password"
                  placeHolder="Enter your password"
                  control={method.control}
                  rules={{ required: "Password is required" }}
                />
              </div>
              <button class="button auth__submit">
                <span class="button__text">Sign Up</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
