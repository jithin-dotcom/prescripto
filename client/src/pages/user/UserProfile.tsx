

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import type { Profile } from "../../interfaces/IUserProfile";


const UserProfile = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?._id);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchUserProfile() {
      try {
        const res = await axiosInstance.get(`/user/user-profile/${userId}`);
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-700">My Profile</h1>
          <button
            onClick={() => navigate(`/edit-profile/${userId}`)}
            className="mt-4 sm:mt-0 bg-[#5F6FFF] text-white px-6 py-2 rounded-lg hover:bg-[#4a54e1] hover:scale-105 transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white border border-[#C9D8FF] rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 hover:scale-105 transition">
          <div className="flex-shrink-0 self-center sm:self-start">
            <img
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
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
