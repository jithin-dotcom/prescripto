


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

import ChatUI from "./pages/chat/Chat";
import ChatDashboard from "./pages/chat/ChatDashboard";
import VideoCall from "./pages/video/videoCall";
import AppointmentDetails from "./pages/doctor/AppointmentDetails";
import AdminAppointmentDetails from "./pages/admin/AdminAppointmentDetails";
import UserAppointmentDetails from "./pages/user/UserAppointmentDetails";

import { RateDoctor } from "./pages/user/DoctorRating";
import CreatePrescription from "./pages/doctor/createPrescription";
import EditPrescription from "./pages/doctor/EditPrescription";
import RaiseConcernPage from "./pages/user/RaiseConcernPage";

import RequestPayout from "./pages/doctor/RequestPayout";
import About from "./components/About";
import Contact from "./components/Contact";
import PatientHistory from "./pages/doctor/PatientHistory";
import DoctorWalletPage from "./pages/doctor/DoctorWalletPage";
import UserWalletPage from "./pages/user/UserWalletPage";
import AdminPayoutRequestsPage from "./pages/admin/AdminPayoutRequestsPage";
import DoctorPayoutRequestsPage from "./pages/doctor/DoctorPayoutRequestsPage";
import AdminConcernsPage from "./pages/admin/AdminConcernsPage";
import DoctorConcernsPage from "./pages/doctor/DoctorConcernsPage";
import UserConcernsPage from "./pages/user/UserConcernsPage";
import AdminRatingsPage from "./pages/admin/AdminRatingsPage";
import UserRatingsPage from "./pages/user/UserRatingsPage";
import DoctorChangeEmailPage from "./pages/doctor/DoctorChangeEmailPage";
import UserChangeEmailPage from "./pages/user/UserChangeEmailPage";
import UserChangePasswordPage from "./pages/user/UserChangePasswordPage";
import DoctorChangePasswordPage from "./pages/doctor/DoctorChangePasswordPage";
import DoctorRatingsPage from "./pages/doctor/DoctorRatingsPage";

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
          path="/user-appointment-details"
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
          path="/doctor-change-email"
          element={isAuthenticated && (role === "doctor")? <DoctorChangeEmailPage /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/user-change-email"
          element={isAuthenticated && (role === "user")? <UserChangeEmailPage /> : <Navigate to="/login" replace />}
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
          path="/user-change-password"
          element={isAuthenticated && (role === "user")? <UserChangePasswordPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/doctor-change-password"
          element={isAuthenticated && (role === "doctor")? <DoctorChangePasswordPage /> : <Navigate to="/login" replace />}
        />


        <Route
          path="/doctor-wallet"
          element={isAuthenticated && (role === "doctor")? <DoctorWalletPage /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/user-wallet"
          element={isAuthenticated && (role === "user")? <UserWalletPage /> : <Navigate to="/login" replace />}
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
          path="/admin-rating"
          element={isAuthenticated && ( role === "admin")? <AdminRatingsPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/user-rating"
          element={isAuthenticated && ( role === "user")? <UserRatingsPage /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/doctor-rating"
          element={isAuthenticated && ( role === "doctor")? <DoctorRatingsPage /> : <Navigate to="/login" replace />}
        />


        <Route
          path="/create-prescription"
          element={isAuthenticated && (role === "doctor")? <CreatePrescription /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/edit-prescription"
          element={isAuthenticated && (role === "doctor")? <EditPrescription /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/get-concern"
          element={isAuthenticated && (role === "user")? <RaiseConcernPage /> : <Navigate to="/login" replace />}
        />

      
        <Route
          path="/admin-concerns"
          element={isAuthenticated && (role === "admin" )? <AdminConcernsPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/doctor-concerns"
          element={isAuthenticated && (role === "doctor" )? <DoctorConcernsPage /> : <Navigate to="/login" replace />}
        />

        
        <Route
          path="/user-concerns"
          element={isAuthenticated && (role === "user" )? <UserConcernsPage /> : <Navigate to="/login" replace />}
        />


        <Route
          path="/admin-payouts"
          element={isAuthenticated && (role === "admin")? <AdminPayoutRequestsPage /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/doctor-payouts"
          element={isAuthenticated && (role === "doctor")? <DoctorPayoutRequestsPage /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/get-requestPayout"
          element={isAuthenticated && (role === "admin" || role === "doctor" )? <RequestPayout /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/about"
          element={isAuthenticated && (role === "user" )? <About /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/contact"
          element={isAuthenticated && (role === "user" )? <Contact /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/patient-history"
          element={isAuthenticated && (role === "doctor" )? <PatientHistory /> : <Navigate to="/login" replace />}
        />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? getDashboardRoute() : "/login"} replace />} />
      </Routes>
    </>
  );
};

export default App;















































