import React, { useState } from "react";
import authService from "../appwrite/auth.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup({ isOpen, onClose, switchToLogin }) {
  if (!isOpen) return null; 

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          onClose(); 
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative animate-fadeIn scale-100 transition-transform duration-300">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          ✖
        </button>

        <h2 className="text-center text-2xl font-bold">Sign up to create an account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <button
            onClick={() => {
              onClose(); 
              switchToLogin(); 
            }}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </button>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-4">
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register("name", { required: "Full name is required" })}
          />
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          <Button type="submit" className="w-full mt-4">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
