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

  terms: yup.boolean().oneOf([true], "You must accept Terms & Conditions"),
});

export default function RegisterForm() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMessage("Registration Successful!");
    reset();
  };

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <h2>Create your account</h2>
          <p>Fill in your details to register.</p>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>Full Name</label>
            <input
              className={errors.fullName ? "input error" : "input"}
              placeholder="John Doe"
              {...register("fullName")}
            />
            {errors.fullName && <span className="errorText">{errors.fullName.message}</span>}
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              className={errors.email ? "input error" : "input"}
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email && <span className="errorText">{errors.email.message}</span>}
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              className={errors.password ? "input error" : "input"}
              placeholder="At least 8 chars + 1 number"
              {...register("password")}
            />
            {errors.password && <span className="errorText">{errors.password.message}</span>}
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              className={errors.confirmPassword ? "input error" : "input"}
              placeholder="Re-enter password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="errorText">{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className="termsRow">
            <label className="checkboxLabel">
              <input type="checkbox" {...register("terms")} />
              <span>
                I agree to the <b>Terms & Conditions</b>
              </span>
            </label>
          </div>
          {errors.terms && <span className="errorText">{errors.terms.message}</span>}

          <button className="btn" type="submit">
            Register
          </button>

          {successMessage && <div className="success">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
}