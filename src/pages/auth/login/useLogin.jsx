import { useState } from "react";
import { authServices } from "../../../services/auth/authServices";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { toast } from "react-hot-toast";

export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  const login = async (e) => {
   e.preventDefault();
   setIsLoding(true);
   setError(null);

    try {
      const data = await authServices.login(form);
      
      const access_token  = data?.data?.access_token;

      setAuth(access_token, { email: form.email });

      toast.success("Login successful");
      navigate("/");
      return data;
    } catch (err) {
      console.log(err);
      

      const errorMessage = err.response?.data?.error?.message; 
      setError(errorMessage);
    } finally {
      setIsLoding(false);
    }
  };

  return { form, setForm, login, isLoading, error  };
}
