import React, { useState } from "react";
import { authServices } from "../../../services/auth/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    setIsLoding(true);

    try {
      const data = await authServices.register(form);

      toast.success("Registration successful! Please login.");
      navigate("/auth/login");
      return data;
    } catch (err) {
      setError(err.response?.data?.error?.details);
    } finally {
      setIsLoding(false);
    }
  };

  return { form, isLoading, setForm, Register, error };
}
