import { create } from "zustand";
import { quizServices } from "../services/quiz/quizServices";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useQuizStore = create(
  persist(
    (set, get) => ({
      subtests: [],

      sessionId: null,
      quizTitel: "",
      questions: [],
      endTime: null,

      userAnswers: {},
      isLoading: false,
      error: null,

      fetchSubtests: async () => {
        set({ isLoading: true });
        try {
          const response = await quizServices.getSubtests();
          const finalData = response.data || response;
          set({ subtests: finalData });
        } catch (err) {
          set({ error: err.response?.error?.message });
        } finally {
          set({ isLoading: false });
        }
      },

      startSession: async (subtestId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await quizServices.startQuiz(subtestId);
          const data = response.data;

          const safeSlug = data.subtest_name.toLowerCase().replace(/\s+/g, "-");

          set({
            sessionId: data.session_id,
            quizTitle: data.subtest_name,
            questions: data.questions || [],
            quizSlug: safeSlug,
            endTime: data.expires_at,
            currentQuestionIndex: 0,
            userAnswers: {},
          });

          return { ...data, generatedSlug: safeSlug };
        } catch (err) {
          if (err.response?.status === 409) {
            toast.error("Anda masih memiliki sesi kuis yang aktif!");
          } else {
            toast.error(
              err.response?.data?.error?.message || "Gagal memulai kuis.",
            );
          }

          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      resumeSession: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await quizServices.getActiveSession();
          const data = response.data;

          const safeSlug = data.subtest_name.toLowerCase().replace(/\s+/g, "-");

          const { userAnswers: localAnswers, sessionId: localSessionId } =
            get();
          let finalAnswers = data.saved_answers || {};

          if (
            Object.keys(finalAnswers).length === 0 &&
            data.session_id === localSessionId &&
            Object.keys(localAnswers).length > 0
          ) {
            finalAnswers = localAnswers;
          }

          set({
            sessionId: data.session_id,
            quizTitle: data.subtest_name,
            questions: data.questions || [],
            quizSlug: safeSlug,
            endTime: data.expires_at,
            userAnswers: finalAnswers,
            currentQuestionIndex: data.last_question_index || 0,
          });

          return { ...data, generatedSlug: safeSlug };
        } catch (err) {
          const msg = err.response?.data?.error?.message || err.response?.data.error;
          console.error(msg);

          set({ sessionId: null });
        } finally {
          set({ isLoading: false });
        }
      },

      setAnswer: (questionNumber, answerValue) => {
        set((state) => ({
          userAnswers: {
            ...state.userAnswers,
            [questionNumber]: answerValue,
          },
        }));
      },

      finishQuiz: async () => {
        set({ isLoading: true });
        set({ endTime: null });

        try {
          const { userAnswers, questions } = get();
          const formattedAnswers = {};

          questions.forEach((question) => {
            const key = question.question_number;

            if (userAnswers[key]) {
              formattedAnswers[key] = userAnswers[key];
            } else {
              formattedAnswers[key] = "";
            }
          });

          const payload = { answers: formattedAnswers };

          await quizServices.submitQuiz(payload);
        } catch (err) {
          console.error(err);
        } finally {
          set({
            isLoading: false,
            sessionId: null,
            endTime: null,
            questions: [],
            userAnswers: {},
            currentQuestionIndex: 0,
          });
          localStorage.removeItem("quiz-storage");
        }
      },

      resetQuiz: () =>
        set({
          sessionId: null,
          question: [],
          endTime: null,
          currentQuestionIndex: 0,
          userAnswers: {},
          error: null,
        }),
    }),
    {
      name: "quiz-storage",
      partialize: (state) => ({
        userAnswers: state.userAnswers,
        sessionId: state.sessionId,
        subtests: state.subtests,
      }),
    },
  ),
);
