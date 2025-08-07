
// import React from "react";
// // import { Routes, Route, Navigate} from "react-router-dom";
// import { Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
// import { useEffect, useState } from "react";

// import { io, Socket } from "socket.io-client";
// import IncomingCallPopup from "./components/IncomingCallPopup";
// const socket = io("http://localhost:5000/video");

// import Signup from "./pages/auth/Signup";
// import Login from "./pages/auth/Login";
// import UserDashboard from "./pages/user/Home";
// import DoctorDashboard from "./pages/doctor/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";
// import { useAuthStore } from "./store/authStore";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import VerifyOtp from "./pages/auth/VerifyOtp";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import VerifyForgotPassword from "./pages/auth/VerifyForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import GoogleCallback from "./pages/auth/GoogleCallback";
// import AddDoctor from "./pages/admin/AddDoctors";
// import DoctorsList from "./pages/admin/DoctorsList";
// import AllAppointments from "./pages/admin/AllApointments";
// import AddUser from "./pages/admin/AddUser";
// import UsersList from "./pages/admin/UserList";
// import EditUser from "./pages/admin/EditUser";
// import EditDoctor from "./pages/admin/EditDoctor";
// import AllDoctors from "./pages/user/AllDoctors";
// import UserProfile from "./pages/user/UserProfile";
// import DoctorProfile from "./pages/doctor/DoctorProfile";
// import EditUserProfile from "./pages/user/EditUserProfile";
// import EditDoctorProfile from "./pages/doctor/EditDoctorProfile";
// import Appointment from "./pages/user/Appointments";
// import MyAppointments from "./pages/user/MyAppointments";
// import DoctorAppointments from "./pages/doctor/DoctorAppointments";
// import ChangeEmail from "./pages/auth/ChangeEmail";
// import ChangePassword from "./pages/auth/ChangePassword";
// import ChatUI from "./pages/chat/Chat";
// import ChatDashboard from "./pages/chat/ChatDashboard";
// import VideoCall from "./pages/video/videoCall";
// import AppointmentDetails from "./pages/doctor/AppointmentDetails";
// import AdminAppointmentDetails from "./pages/admin/AdminAppointmentDetails";
// import UserAppointmentDetails from "./pages/user/UserAppointmentDetails";
// import WalletPage from "./components/WalletPage";
// import { RateDoctor } from "./pages/user/DoctorRating";
// import DoctorRatingsPage from "./components/DoctorRatingsPage";
// // import CreatePrescription from "./pages/doctor/CreatePrescription";
// import CreatePrescription from "./pages/doctor/createPrescription";
// import EditPrescription from "./pages/doctor/EditPrescription";
// import RaiseConcernPage from "./pages/user/RaiseConcernPage";
// import AllConcerns from "./components/AllConcern";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import RequestPayout from "./pages/doctor/RequestPayout";
// import PayoutRequests from "./components/PayoutRequests";
// import { toast } from "react-toastify";

// const App: React.FC = () => {
//   const accessToken = useAuthStore((state) => state.accessToken);
//   const role = useAuthStore((state) => state.role);
//   const isAuthenticated = !!accessToken;
//   const hasHydrated = useAuthStore((state) => state.hasHydrated);






  
//   const { user } = useAuthStore()
//     const userId = user?._id;
//   const navigate = useNavigate();

//   const [incomingCall, setIncomingCall] = useState<{
//     from: string;
//     name: string;
//     signal: any;
//     appointmentId: string;
//     doctorId: string;
//     patientId: string;
//   } | null>(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   useEffect(() => {
//     if (!hasHydrated || !userId) return;

//     socket.emit("register-user", userId);

//     socket.on("incoming-call", (data) => {
//       console.log("Incoming call:", data);
//       setIncomingCall(data);
//       setIsPopupOpen(true);
//     });

//     socket.on("error", ({ message }) => {
//       toast.error(message);
//     });

//     socket.on("call-rejected", ({ appointmentId }) => {
//       toast.info("Call was rejected");
//       setIsPopupOpen(false);
//     });

//     socket.on("call-accepted", ({ signal, appointmentId }) => {
//       navigate("/my-video", {
//         state: { signal, appointmentId, userId, doctorId: incomingCall?.doctorId, patientId: incomingCall?.patientId },
//       });
//     });

//     return () => {
//       socket.off("incoming-call");
//       socket.off("error");
//       socket.off("call-rejected");
//       socket.off("call-accepted");
//     };
//   }, [userId, hasHydrated]);

//   const handleAccept = () => {
//     if (!incomingCall) return;
//     socket.emit("answer-call", {
//       to: incomingCall.from,
//       signal: null, // Replace with WebRTC signal if implemented
//       appointmentId: incomingCall.appointmentId,
//     });
//     setIsPopupOpen(false);
//   };

//   const handleReject = () => {
//     if (!incomingCall) return;
//     socket.emit("reject-call", {
//       to: incomingCall.from,
//       appointmentId: incomingCall.appointmentId,
//     });
//     setIsPopupOpen(false);
//   };







  
//   const getDashboardRoute = () => {
//     if (role === "doctor") return "/doctor-dashboard";
//     if (role === "admin") return "/admin-dashboard";
//     return "/user-dashboard";
//   };

  
//   if (!hasHydrated) {
//     return <div className="text-center mt-20 text-lg">Loading...</div>;
//   }

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* <ToastContainer />
//       {isPopupOpen && incomingCall && (
//         <IncomingCallPopup
//           callerId={incomingCall.userId || incomingCall.doctorId}
//           onAccept={handleAccept}
//           onReject={handleReject}
//         />
//       )} */}

//          {isPopupOpen && incomingCall && (
//         <IncomingCallPopup
//           callerId={incomingCall.from}
//           callerName={incomingCall.name}
//           onAccept={handleAccept}
//           onReject={handleReject}
//         />
//       )}

//       <Routes>
//         <Route
//           path="/login"
//           element={!isAuthenticated ? <Login /> : <Navigate to={getDashboardRoute()} replace />}
//         />
//         <Route
//           path="/signup"
//           element={!isAuthenticated ? <Signup /> : <Navigate to={getDashboardRoute()} replace />}
//         />
//         <Route
//           path="/verify-otp"
//           element={!isAuthenticated ? <VerifyOtp /> : <Navigate to={getDashboardRoute()} replace />}
//         />
//         <Route
//           path="/forgot-password"
//           element={!isAuthenticated ? <ForgotPassword /> : <Navigate to={getDashboardRoute()} replace />}
//         />
//         <Route
//           path="/verify-forgot-password"
//           element={!isAuthenticated ? <VerifyForgotPassword /> : <Navigate to={getDashboardRoute()} replace />}
//         />
//         <Route
//           path="/reset-password"
//           element={!isAuthenticated ? <ResetPassword /> : <Navigate to={getDashboardRoute()} replace />}
//         />

        
//         <Route
//           path="/user-dashboard"
//           element={isAuthenticated && role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/doctor-dashboard"
//           element={isAuthenticated && role === "doctor" ? <DoctorDashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/admin-dashboard"
//           element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/auth/google/callback"
//           element={!isAuthenticated ? <GoogleCallback /> : <Navigate to={getDashboardRoute()} replace />}
//         />
//         <Route
//           path="/add-doctor"
//           element={isAuthenticated && role === "admin" ? <AddDoctor /> : <Navigate to="/login" replace />}
//         />

//          <Route
//           path="/doctor-list"
//           element={isAuthenticated && role === "admin" ? <DoctorsList /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/all-appointments"
//           element={isAuthenticated && role === "admin" ? <AllAppointments /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/add-user"
//           element={isAuthenticated && role === "admin" ? <AddUser /> : <Navigate to="/login" replace />}
//         />

//          <Route
//           path="/user-list"
//           element={isAuthenticated && role === "admin" ? <UsersList /> : <Navigate to="/login" replace />}
//         />
//          <Route
//           path="/edit-user/:id"
//           element={isAuthenticated && role === "admin" ? <EditUser /> : <Navigate to="/login" replace />}
//         />
//          <Route
//           path="/edit-doctor/:id"
//           element={isAuthenticated && role === "admin" ? <EditDoctor /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/admin-appointment-details"
//           element={isAuthenticated && role === "admin" ? <AdminAppointmentDetails /> : <Navigate to="/login" replace />}
//         />
       

//          <Route
//           path="/all-doctors"
//           element={isAuthenticated && role === "user" ? <AllDoctors /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/profile"
//           element={isAuthenticated && role === "user" ? <UserProfile /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/doctor-profile"
//           element={isAuthenticated && role === "doctor" ? <DoctorProfile /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/edit-profile/:id"
//           element={isAuthenticated && role === "user" ? <EditUserProfile /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/appointment/:doctorId"
//           element={isAuthenticated && role === "user" ? <Appointment /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/my-appointments/"
//           element={isAuthenticated && role === "user" ? <MyAppointments /> : <Navigate to="/login" replace />}
//         />
         
//         <Route
//           path="/user-appointment-details/"
//           element={isAuthenticated && role === "user" ? <UserAppointmentDetails /> : <Navigate to="/login" replace />}
//         />
         
//         <Route
//           path="/edit-profile-doctor/:id"
//           element={isAuthenticated && role === "doctor" ? <EditDoctorProfile /> : <Navigate to="/login" replace />}
//         />

//          <Route
//           path="/doctor-appointments"
//           element={isAuthenticated && role === "doctor" ? <DoctorAppointments /> : <Navigate to="/login" replace />}
//         />

//          <Route
//           path="/appointment-details"
//           element={isAuthenticated && role === "doctor" ? <AppointmentDetails /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/change-email"
//           element={isAuthenticated && (role === "doctor" || role === "user")? <ChangeEmail /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/chat"
//           element={isAuthenticated && (role === "doctor" || role === "user")? <ChatUI /> : <Navigate to="/login" replace />}
//         />
        
//         <Route
//           path="/my-chat"
//           element={isAuthenticated && (role === "doctor" || role === "user")? <ChatDashboard /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/change-password"
//           element={isAuthenticated && (role === "doctor" || role === "user")? <ChangePassword /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/wallet"
//           element={isAuthenticated && (role === "doctor" || role === "user")? <WalletPage /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/rate-doctor"
//           element={isAuthenticated && ( role === "user")? <RateDoctor /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/my-video"
//           element={isAuthenticated && (role === "doctor" || role === "user")? <VideoCall /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/rating"
//           element={isAuthenticated && (role === "doctor" || role === "admin" || role === "user")? <DoctorRatingsPage /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/create-prescription"
//           element={isAuthenticated && (role === "doctor")? <CreatePrescription /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/edit-prescription"
//           element={isAuthenticated && (role === "doctor")? <EditPrescription /> : <Navigate to="/login" replace />}
//         />

//          <Route
//           path="/get-concern"
//           element={isAuthenticated && (role === "user")? <RaiseConcernPage /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/all-concerns"
//           element={isAuthenticated && (role === "admin" || role === "user" || role === "doctor")? <AllConcerns /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/about"
//           element={isAuthenticated && (role === "user")? <About /> : <Navigate to="/login" replace />}
//         />
         
//          <Route
//           path="/contact"
//           element={isAuthenticated && (role === "user")? <Contact /> : <Navigate to="/login" replace />}
//         />

//          <Route
//           path="/get-requestPayout"
//           element={isAuthenticated && (role === "doctor")? <RequestPayout /> : <Navigate to="/login" replace />}
//         />

//           <Route
//           path="/all-payouts"
//           element={isAuthenticated && (role === "admin" || role === "doctor")? <PayoutRequests /> : <Navigate to="/login" replace />}
//         />

        
//         <Route path="*" element={<Navigate to={isAuthenticated ? getDashboardRoute() : "/login"} replace />} />
//       </Routes>

//             {/* {isPopupOpen && (
//         <IncomingCallPopup
//           callerName="Doctor"
//           onAccept={handleAccept}
//           onReject={handleReject}
//         />
//       )} */}
//     </>
//   );
// };

// export default App;



























































import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import IncomingCallPopup from "./components/IncomingCallPopup";
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
import MyVideoCall from "./pages/video/videoCall";
import AppointmentDetails from "./pages/doctor/AppointmentDetails";
import AdminAppointmentDetails from "./pages/admin/AdminAppointmentDetails";
import UserAppointmentDetails from "./pages/user/UserAppointmentDetails";
import WalletPage from "./components/WalletPage";
import { RateDoctor } from "./pages/user/DoctorRating";
import DoctorRatingsPage from "./components/DoctorRatingsPage";
import CreatePrescription from "./pages/doctor/createPrescription";
import EditPrescription from "./pages/doctor/EditPrescription";
import RaiseConcernPage from "./pages/user/RaiseConcernPage";
import AllConcerns from "./components/AllConcern";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RequestPayout from "./pages/doctor/RequestPayout";
import PayoutRequests from "./components/PayoutRequests";

// Export socket for reuse in other components
export const socket: Socket = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
  withCredentials: true,
  autoConnect: false,
});

const App: React.FC = () => {
  const { accessToken, role, hasHydrated, user } = useAuthStore();
  const isAuthenticated = !!accessToken;
  const userId = user?._id;
  const navigate = useNavigate();

  const [incomingCall, setIncomingCall] = useState<{
    from: string;
    name: string;
    signal: any;
    appointmentId: string;
    doctorId: string;
    patientId: string;
  } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!hasHydrated || !userId || !accessToken) {
      console.warn("Skipping socket connection: missing auth data");
      socket.disconnect();
      return;
    }

    socket.auth = { token: accessToken, userId };
    socket.connect();
    console.log("Socket connecting for user:", userId);

    socket.on("connect", () => {
      console.log(`Socket connected: ${socket.id}`);
      socket.emit("register-user", userId);
      console.log("Emitted register-user:", userId);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      toast.error(`Failed to connect to video call server: ${error.message}`);
    });

    socket.on("incoming-call", (data) => {
      console.log("Incoming call received:", data);
      toast.info(`Incoming call from ${data.name}`);
      setIncomingCall(data);
      setIsPopupOpen(true);
    });

    socket.on("error", ({ message }) => {
      console.error("Socket error:", message);
      toast.error(message);
    });

    socket.on("call-rejected", ({ appointmentId }) => {
      console.log("Call rejected:", appointmentId);
      toast.info("Call was rejected");
      setIsPopupOpen(false);
      setIncomingCall(null);
    });

    socket.on("call-accepted", ({ signal, appointmentId }) => {
      console.log("Call accepted received:", { signal, appointmentId });
      navigate("/my-video", {
        state: { signal, appointmentId, userId, doctorId: incomingCall?.doctorId, patientId: incomingCall?.patientId, isCaller: false },
      });
      setIsPopupOpen(false);
      setIncomingCall(null);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("incoming-call");
      socket.off("error");
      socket.off("call-rejected");
      socket.off("call-accepted");
    };
  }, [userId, hasHydrated, accessToken, navigate]);

  const handleAccept = () => {
    if (!incomingCall) return;
    console.log("Accepting call:", incomingCall);
    socket.emit("answer-call", {
      to: incomingCall.from,
      appointmentId: incomingCall.appointmentId,
    });
    navigate("/my-video", {
      state: {
        signal: incomingCall.signal,
        appointmentId: incomingCall.appointmentId,
        userId,
        doctorId: incomingCall.doctorId,
        patientId: incomingCall.patientId,
        isCaller: false,
      },
    });
    setIsPopupOpen(false);
    setIncomingCall(null);
  };

  const handleReject = () => {
    if (!incomingCall) return;
    console.log("Rejecting call:", incomingCall);
    socket.emit("reject-call", {
      to: incomingCall.from,
      appointmentId: incomingCall.appointmentId,
    });
    setIsPopupOpen(false);
    setIncomingCall(null);
  };

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
      {isPopupOpen && incomingCall && (
        <IncomingCallPopup
          callerId={incomingCall.from}
          callerName={incomingCall.name}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
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
          element={isAuthenticated && (role === "doctor" || role === "user") ? <ChangeEmail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat"
          element={isAuthenticated && (role === "doctor" || role === "user") ? <ChatUI /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-chat"
          element={isAuthenticated && (role === "doctor" || role === "user") ? <ChatDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/change-password"
          element={isAuthenticated && (role === "doctor" || role === "user") ? <ChangePassword /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/wallet"
          element={isAuthenticated && (role === "doctor" || role === "user") ? <WalletPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/rate-doctor"
          element={isAuthenticated && role === "user" ? <RateDoctor /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-video"
          element={isAuthenticated && (role === "doctor" || role === "user") ? <MyVideoCall /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/rating"
          element={isAuthenticated && (role === "doctor" || role === "admin" || role === "user") ? <DoctorRatingsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/create-prescription"
          element={isAuthenticated && role === "doctor" ? <CreatePrescription /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-prescription"
          element={isAuthenticated && role === "doctor" ? <EditPrescription /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/get-concern"
          element={isAuthenticated && role === "user" ? <RaiseConcernPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/all-concerns"
          element={isAuthenticated && (role === "admin" || role === "user" || role === "doctor") ? <AllConcerns /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={isAuthenticated && role === "user" ? <About /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/contact"
          element={isAuthenticated && role === "user" ? <Contact /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/get-requestPayout"
          element={isAuthenticated && role === "doctor" ? <RequestPayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/all-payouts"
          element={isAuthenticated && (role === "admin" || role === "doctor") ? <PayoutRequests /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? getDashboardRoute() : "/login"} replace />} />
      </Routes>
    </>
  );
};

export default App;





























