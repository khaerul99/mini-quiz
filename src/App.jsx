import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomeDashboard from "./pages/dashboard/home";
import QuizPage from "./pages/dashboard/quiz";
import ResultPage from "./pages/dashboard/result";
import HistoryPage from "./pages/dashboard/history";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/dashboard/profile";
import VerifyEmail from "./pages/auth/verify-email";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <HomeDashboard />,
  },
  {
    path: "/quiz/active",
    element: <QuizPage />,
  },
  {
    path: "/result/:subtestId",
    element: <ResultPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/verify",
    element: <VerifyEmail />,
  },
]);

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [fetchUser, token]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
