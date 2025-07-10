

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { toast } from "react-toastify";
import type { GoogleCredentialResponse } from "../../interfaces/IGoogleCredentials";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
import logo from'../../assets/Screenshot 2025-07-08 170708.png';


declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            options: Record<string, unknown>
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(email === "" || password === ""){
        toast.error("Email and Password cannot be empty");
        return;
      }
      const res = await axios.post("/api/auth/login", { email, password });
      console.log("Login response data:", res);
      const { accessToken, user } = res.data;
      setAuth({ accessToken, user });
      
      // setAuth({ accessToken, user });
      switch (user.role) {
        case "user":
          navigate("/user-dashboard", { replace: true });
          break;
        case "doctor":
          navigate("/doctor-dashboard", { replace: true });
          break;
        case "admin":
          navigate("/admin-dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
      toast.success("Login successful!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
      } else {
        console.error("Login unknown error:", err);
        toast.error("Invalid Email or Password ");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      const res = await axios.post("/api/auth/google-login", { credential });
      
      console.log("response: ",res);
      const { tokens, user } = res.data;
      const accessToken = tokens.accessToken;
      setAuth({ accessToken, user });
      console.log("Logged in user role:", user);
       console.log("access token :", accessToken);
       console.log("res.data:", res.data);


      toast.success("Logged in with Google!");

      switch (user.role) {
        case "user":
          navigate("/user-dashboard", { replace: true });
          break;
        case "doctor":
          navigate("/doctor-dashboard", { replace: true });
          break;
        case "admin":
          navigate("/admin-dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } catch (err) {
      
      if(err instanceof Error){
        toast.error(err.message || "Google login failed");
      }else{
        toast.error("Google login failed");
      }

    }
  };

  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: GoogleCredentialResponse) => {
        if (response.credential) {
          handleGoogleLogin(response.credential);
        } else {
          toast.error("Google login failed.");
        }
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
  },[]);       

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-12 mx-auto mb-0" 
          />
          {/* <h2 className="text-3xl font-bold text-blue-600">Welcome Back</h2> */}
          <p className="text-sm text-gray-500 mt-0">Please login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <Link to="/forgot-password" className="hover:text-blue-500">Forgot password?</Link>
            <Link to="/signup" className="hover:text-blue-500">Create account</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-full bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px w-full bg-gray-200" />
        </div>

        <div id="google-login-button" className="w-full" />
      </div>
    </div>
  );
};

export default Login;
