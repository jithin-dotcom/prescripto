
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { FcGoogle } from "react-icons/fc";

const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60", "#2c3e50"];
const nameRegex = /^[A-Za-z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordScore(calculatePasswordStrength(form.password));
  }, [form.password]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!nameRegex.test(form.name)){
      toast.error("Name must only have Alphabets");
      return;
    }

    if(!emailRegex.test(form.email)){
      toast.error("please enter a valid Email");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if(!passwordRegex.test(form.password)){
      toast.error("Password must have at least one alphabet and one number");
      return;
    }

    if (passwordScore < 3) {
      toast.error("Password is too weak");
      return;
    }


    setLoading(true);
    try {
      await axios.post("/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error("Signup failed: " + (err.response?.data?.message || err.message));
      } else if (err instanceof Error) {
        toast.error("Signup failed: " + err.message);
      } else {
        toast.error("Signup failed. Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = "http://localhost:5000/api/auth/google/callback";
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">Create your account</h2>
          <p className="text-sm text-gray-500 mt-2">Join us and explore the platform</p>
        </div>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
             
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              
            />
            <div className="mb-1 mt-1 h-2 rounded bg-gray-200">
              <div
                style={{
                  width: `${(passwordScore / 5) * 100}%`,
                  backgroundColor: strengthColors[passwordScore],
                  height: "100%",
                  borderRadius: "inherit",
                }}
              />
            </div>
            <p className="text-sm" style={{ color: strengthColors[passwordScore] }}>
              {strengthLabels[passwordScore]}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Sending OTP..." : "Sign up"}
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-full bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px w-full bg-gray-200" />
        </div>
        {/* <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm">Continue with Google</span>
        </button> */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
