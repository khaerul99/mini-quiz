import api from "../../lib/axios";

export const quizServices = {
   getSubtests: async () => {
      const response = await api.get("/subtests");
      return response.data
   },
   startQuiz: async (subtestId) => {
      const response = await api.get(`/quiz/start/${subtestId}`);
      return response.data
   },
   getActiveSession: async () => {
      const response = await api.get('/quiz/active');
      return response.data
   },
   submitQuiz: async (payload) => {
      const response = await api.post("/quiz/submit", payload);
      return response.data
   }
}