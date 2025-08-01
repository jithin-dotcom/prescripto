
import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user/Home";
import DoctorDashboard from "./pages/doctor/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import { useAuthStore } from "./store/authStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyForgotPassword from "./pages/auth/VerifyForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import GoogleCallback from "./pages/auth/GoogleCallback";
import AddDoctor from "./pages/admin/AddDoctors";
import DoctorsList from "./pages/admin/DoctorsList";
import AllAppointments from "./pages/admin/AllApointments";
import AddUser from "./pages/admin/AddUser";
import UsersList from "./pages/admin/UserList";
import EditUser from "./pages/admin/EditUser";
import EditDoctor from "./pages/admin/EditDoctor";
import AllDoctors from "./pages/user/AllDoctors";
import UserProfile from "./pages/user/UserProfile";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import EditUserProfile from "./pages/user/EditUserProfile";
import EditDoctorProfile from "./pages/doctor/EditDoctorProfile";
import Appointment from "./pages/user/Appointments";
import MyAppointments from "./pages/user/MyAppointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import ChangeEmail from "./pages/auth/ChangeEmail";
import ChangePassword from "./pages/auth/ChangePassword";
import ChatUI from "./pages/chat/Chat";
import ChatDashboard from "./pages/chat/ChatDashboard";
import VideoCall from "./pages/video/videoCall";
import AppointmentDetails from "./pages/doctor/AppointmentDetails";
import AdminAppointmentDetails from "./pages/admin/AdminAppointmentDetails";
import UserAppointmentDetails from "./pages/user/UserAppointmentDetails";
import WalletPage from "./components/WalletPage";
import { RateDoctor } from "./pages/user/DoctorRating";
import DoctorRatingsPage from "./components/DoctorRatingsPage";
import CreatePrescription from "./pages/doctor/createPrescription";

const App: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = !!accessToken;
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  
  const getDashboardRoute = () => {
    if (role === "doctor") return "/doctor-dashboard";
    if (role === "admin") return "/admin-dashboard";
    return "/user-dashboard";
  };

  
  if (!hasHydrated) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/verify-otp"
          element={!isAuthenticated ? <VerifyOtp /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/forgot-password"
          element={!isAuthenticated ? <ForgotPassword /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/verify-forgot-password"
          element={!isAuthenticated ? <VerifyForgotPassword /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/reset-password"
          element={!isAuthenticated ? <ResetPassword /> : <Navigate to={getDashboardRoute()} replace />}
        />

        
        <Route
          path="/user-dashboard"
          element={isAuthenticated && role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/doctor-dashboard"
          element={isAuthenticated && role === "doctor" ? <DoctorDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-dashboard"
          element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/auth/google/callback"
          element={!isAuthenticated ? <GoogleCallback /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/add-doctor"
          element={isAuthenticated && role === "admin" ? <AddDoctor /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/doctor-list"
          element={isAuthenticated && role === "admin" ? <DoctorsList /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/all-appointments"
          element={isAuthenticated && role === "admin" ? <AllAppointments /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/add-user"
          element={isAuthenticated && role === "admin" ? <AddUser /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/user-list"
          element={isAuthenticated && role === "admin" ? <UsersList /> : <Navigate to="/login" replace />}
        />
         <Route
          path="/edit-user/:id"
          element={isAuthenticated && role === "admin" ? <EditUser /> : <Navigate to="/login" replace />}
        />
         <Route
          path="/edit-doctor/:id"
          element={isAuthenticated && role === "admin" ? <EditDoctor /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/admin-appointment-details"
          element={isAuthenticated && role === "admin" ? <AdminAppointmentDetails /> : <Navigate to="/login" replace />}
        />
       

         <Route
          path="/all-doctors"
          element={isAuthenticated && role === "user" ? <AllDoctors /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/profile"
          element={isAuthenticated && role === "user" ? <UserProfile /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/doctor-profile"
          element={isAuthenticated && role === "doctor" ? <DoctorProfile /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/edit-profile/:id"
          element={isAuthenticated && role === "user" ? <EditUserProfile /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/appointment/:doctorId"
          element={isAuthenticated && role === "user" ? <Appointment /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/my-appointments/"
          element={isAuthenticated && role === "user" ? <MyAppointments /> : <Navigate to="/login" replace />}
        />
         
        <Route
          path="/user-appointment-details/"
          element={isAuthenticated && role === "user" ? <UserAppointmentDetails /> : <Navigate to="/login" replace />}
        />
         
        <Route
          path="/edit-profile-doctor/:id"
          element={isAuthenticated && role === "doctor" ? <EditDoctorProfile /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/doctor-appointments"
          element={isAuthenticated && role === "doctor" ? <DoctorAppointments /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/appointment-details"
          element={isAuthenticated && role === "doctor" ? <AppointmentDetails /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/change-email"
          element={isAuthenticated && (role === "doctor" || role === "user")? <ChangeEmail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat"
          element={isAuthenticated && (role === "doctor" || role === "user")? <ChatUI /> : <Navigate to="/login" replace />}
        />
        
        <Route
          path="/my-chat"
          element={isAuthenticated && (role === "doctor" || role === "user")? <ChatDashboard /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/change-password"
          element={isAuthenticated && (role === "doctor" || role === "user")? <ChangePassword /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/wallet"
          element={isAuthenticated && (role === "doctor" || role === "user")? <WalletPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/rate-doctor"
          element={isAuthenticated && ( role === "user")? <RateDoctor /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/my-video"
          element={isAuthenticated && (role === "doctor" || role === "user")? <VideoCall /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/rating"
          element={isAuthenticated && (role === "doctor" || role === "admin" || role === "user")? <DoctorRatingsPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/create-prescription"
          element={isAuthenticated && (role === "doctor")? <CreatePrescription /> : <Navigate to="/login" replace />}
        />

        
        <Route path="*" element={<Navigate to={isAuthenticated ? getDashboardRoute() : "/login"} replace />} />
      </Routes>
    </>
  );
};

export default App;

