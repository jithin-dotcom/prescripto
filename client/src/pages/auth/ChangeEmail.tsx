


// import { motion } from "framer-motion";
// import  logo  from "../../assets/logo.svg"

// const fadeIn = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const ChangeEmail = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-2xl border"
//       >
        
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//             <img src={logo} alt="logo" />
//           Change Email
//         </h2>

//         <form className="space-y-6">
//           <div>
            
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Current Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. john@example.com"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               New Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. newemail@example.com"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Confirm New Email
//             </label>
//             <input
//               type="email"
//               placeholder="Re-enter new email"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <button
//             type="button"
//             className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Update Email
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ChangeEmail;










// import { motion } from "framer-motion";
// import logo from "../../assets/logo.svg";

// const fadeIn = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const ChangeEmail = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-2xl border"
//       >
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={logo}
//             alt="logo"
//             className="h-6 w-auto sm:h-8 mb-3"
//           />
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
//             Change Email
//           </h2>
//         </div>

//         <form className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Current Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. john@example.com"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               New Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. newemail@example.com"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Confirm New Email
//             </label>
//             <input
//               type="email"
//               placeholder="Re-enter new email"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <button
//             type="button"
//             className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Update Email
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ChangeEmail;




// import { motion } from "framer-motion";
// import logo from "../../assets/logo.svg";

// const fadeIn = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const ChangeEmail = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-2xl border"
//       >
//         {/* Logo and Heading */}
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={logo}
//             alt="logo"
//             className="h-8 w-auto sm:h-10 mb-2"
//           />
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
//             Change Email
//           </h2>
//         </div>

//         {/* Form */}
//         <form className="space-y-6">
//           {/* Current Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Current Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. john@example.com"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* New Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               New Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. newemail@example.com"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* Confirm New Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Confirm New Email
//             </label>
//             <input
//               type="email"
//               placeholder="Re-enter new email"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="button"
//             className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Update Email
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ChangeEmail;






// import { motion } from "framer-motion";
// import logo from "../../assets/logo.svg";

// const fadeIn = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const ChangeEmail = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl border"
//       >
//         {/* Logo and Heading */}
//         <div className="flex flex-col items-center mb-4">
//           <img src={logo} alt="logo" className="h-6 w-auto sm:h-7 mb-1" />
//           <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
//             Change Email
//           </h2>
//         </div>

//         {/* Form */}
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Current Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. john@example.com"
//               className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               New Email
//             </label>
//             <input
//               type="email"
//               placeholder="e.g. new@example.com"
//               className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Confirm New Email
//             </label>
//             <input
//               type="email"
//               placeholder="Re-enter new email"
//               className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <button
//             type="button"
//             className="w-full py-2.5 mt-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
//           >
//             Update Email
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ChangeEmail;






import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ChangeEmail = () => {
  const [form, setForm] = useState({
    newEmail: "",
    confirmEmail: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.password) {
      toast.error("Password is required.");
      return;
    }

    if (!emailRegex.test(form.newEmail)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (form.newEmail !== form.confirmEmail) {
        console.log("newemail : ", form.newEmail);
        console.log("confirm email : ", form.confirmEmail);
      toast.error("Emails do not match.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/user/change-email",
        {
          password: form.password,
          newEmail: form.newEmail,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Email updated successfully");
      setForm({ newEmail: "", confirmEmail: "", password: "" });
    } catch (error) {
        if(axios.isAxiosError(error)){
            toast.error(error.response?.data?.message || "Failed to update email");
        }else{
            toast.error("Something went wrong");
        }
     
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl border"
      >
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="logo" className="h-6 w-auto sm:h-7 mb-1" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
            Change Email
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              New Email
            </label>
            <input
              type="email"
              name="newEmail"
              value={form.newEmail}
              placeholder="e.g. new@example.com"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm New Email
            </label>
            <input
              type="email"
              name="confirmEmail"
              value={form.confirmEmail}
              placeholder="Re-enter new email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
          >
            Update Email
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangeEmail;
