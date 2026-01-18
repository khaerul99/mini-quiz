import api from "../../lib/axios";


export const authServices = {
   login: async (credentials) => {
     const response = await api.post("/auth/login", credentials);
     return response.data;
   },

   register: async (userInfo) => {
     const response = await api.post("/auth/register", userInfo);
     return response.data;
   },

   logout: async () => {
     const response = await api.post("/auth/logout");
     return response.data
   },

   updatePassword: async (data) => {
      const response = await api.post("/auth/change-password", data)
      return response.data;
   },

   verifyEmail: async (token) => {
     const response = await api.post("/auth/verify-email", { token });
     return response.data;
   }
}

