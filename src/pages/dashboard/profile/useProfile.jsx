import React, { useEffect, useState } from "react";
import { profileServices } from "../../../services/profile/profileServices";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from "react-hot-toast";
import { authServices } from "../../../services/auth/authServices";


export default function useProfile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
   old_password: "",
   new_password: "",
  }) 

  const toggleModal = () => {
    setModalOpen(true)
   }    

   const handlePassChange = (e) => {

    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };
   


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await profileServices.getProfile();
         
        updateUser(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);


  const handleSubmit = async (e) => {
   e.preventDefault();

   try {
      const response = await profileServices.updateProfile(formData);
      
      
      const resMessage = response.message;
      toast.success(resMessage);

      updateUser({
         ...user,
         name: formData.name,
         email: formData.email
      });

      setModalOpen(false);
   } catch (error) {
      const msg = error.response?.data?.message || "Gagal memperbarui profile";
      toast.error(msg);
   }
  }

  const handleChangePassword = async (e) => {
   e.preventDefault();

   if(!passwordForm.old_password || !passwordForm.new_password) {
      toast.error("semua kolom password harus diisi")
      return
   }

   setIsLoading(true);

   try {
      await authServices.updatePassword(passwordForm)

      toast.success("password berhasil diubah")
      setPasswordForm({
         old_password: "",
         new_password: "",
      })
   } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Gagal mengubah password";
      toast.error(msg);
   } finally {
      setIsLoading(false)
   }

  }



  
  return {
     modalOpen,
     dataProfile: user,
     isLoading,
     formData,
     toggleModal,
     setModalOpen,
     handleSubmit,
     setFormData,
     handleChangePassword,
     handlePassChange
   };
}

