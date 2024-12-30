import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("Authentication/Login"));
const SignUpPage = lazy(() => import("Authentication/SignUp"));
const HomePage = lazy(() => import("Home"));
const ForgotPasswordPage = lazy(() => import("PaaswordAuth/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("PaaswordAuth/ResetPassword"));
const VerifyOTPPage = lazy(() => import("PaaswordAuth/VerifyOTP"));
const NotePage = lazy(() => import("Components/Note")); 
const CategoriesPage = lazy(() => import("Components/Categories"));
const ProfilePage = lazy(() => import("Components/Profile"));
const DevicesPage = lazy(() => import("Components/Devices"));

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        {user && <Route path="/notes" element={<HomePage />} />}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notes" element={<HomePage />} />
        <Route path="/notes/:noteId" element={<NotePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App;
