import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import "assets/styles.css";
import MainLayout from "MainLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
const ProductsPage = lazy(() => import("Components/Products"));
const AddProductPage = lazy(() => import("Components/AddProduct"));

function App() {
  const user = localStorage.getItem("token");

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="719109913508-1v8hi0lb3hrtvgsqcsb5g1pasc84vouc.apps.googleusercontent.com">
        <LoginPage />
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <Routes>
        {user && (
          <Route element={<MainLayout />}>
            <Route path="/notes" element={<HomePage />} />
          </Route>
        )}
        <Route path="/" element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/notes" element={<HomePage />} />
          <Route path="/notes/:noteId" element={<NotePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Route>
        <Route path="*" element={<h1 className="font-bold text-center" style={{ marginTop: "10px", color: "red"  }}>Page Not Found <a href="/" style={{fontSize:"30px"}}>Click for login page</a></h1>} />
      </Routes>
    </>
  );
}

export default App;
