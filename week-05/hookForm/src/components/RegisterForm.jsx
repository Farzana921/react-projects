import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must include at least 1 number"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept Terms & Conditions"),
});

export default function RegisterForm() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMessage("Registration Successful!");
    reset();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Full Name</label>
          <input {...register("fullName")} />
          <p style={{ color: "red" }}>{errors.fullName?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword")} />
          <p style={{ color: "red" }}>
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("terms")} />
            Accept Terms & Conditions
          </label>
          <p style={{ color: "red" }}>{errors.terms?.message}</p>
        </div>

        <button type="submit">Register</button>
      </form>

      {successMessage && (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}
    </div>
  );
}