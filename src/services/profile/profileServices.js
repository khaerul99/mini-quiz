import api from "../../lib/axios";


export const profileServices = {
   getProfile: async () => {
     const response = await api.get("/auth/profile");
     return response.data;
   },

   updateProfile: async (data) => {
      const response = await api.put("/auth/profile", data);
      return response.data
   }
}