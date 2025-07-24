

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import type { Profile } from "../../interfaces/IUserProfile";
import { motion } from "framer-motion";
import { APIUserRoutes } from "../../constants/routes.constants";

const UserProfile = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?._id);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchUserProfile() {
      try {
        const res = await axiosInstance.get(`${APIUserRoutes.USER_PROFILE}/${userId}`);
        const { user, profile: profileData } = res.data.data;

        setProfile({
          name: user?.name || "",
          email: user?.email || "",
          profilePhoto: user?.photo || "",
          dateOfBirth: profileData?.dateOfBirth || "",
          gender: profileData?.gender || "",
          houseName: profileData?.houseName || "",
          city: profileData?.city || "",
          state: profileData?.state || "",
          country: profileData?.country || "",
          pin: profileData?.pin || 0,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfile({
          name: "",
          email: "",
          profilePhoto: "",
          dateOfBirth: "",
          gender: "",
          houseName: "",
          city: "",
          state: "",
          country: "",
          pin: 0,
        });
      }
    }

    fetchUserProfile();
  }, [userId]);

  if (!profile) return <div className="p-8 text-gray-600">Loading profile...</div>;

  return (
    <div className="min-h-screen  flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-gray-700">My Profile</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/edit-profile/${userId}`)}
            className="mt-4 sm:mt-0 bg-[#5F6FFF] text-white px-6 py-2 rounded-lg hover:bg-[#4a54e1] transition shadow-2xl"
          >
            Edit Profile
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6 flex flex-col sm:flex-row gap-6 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <div className="flex-shrink-0 self-center sm:self-start">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={profile.profilePhoto}
              alt={profile.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-[#C9D8FF] shadow-sm"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-[#262626]">
            <div>
              <p className="text-sm text-[#5C5C5C]">Full Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">Date of Birth</p>
              <p className="font-medium">{profile.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">Gender</p>
              <p className="font-medium capitalize">{profile.gender}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">House Name</p>
              <p className="font-medium">{profile.houseName}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">City</p>
              <p className="font-medium">{profile.city}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">State</p>
              <p className="font-medium">{profile.state}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">Country</p>
              <p className="font-medium">{profile.country}</p>
            </div>
            <div>
              <p className="text-sm text-[#5C5C5C]">PIN Code</p>
              <p className="font-medium">{profile.pin}</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserProfile;
