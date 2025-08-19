

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdmin";
import Sidebar from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import type { DoctorProfileData } from "../../interfaces/IDoctorProfile";
import { APIUserRoutes } from "../../constants/routes.constants";



const DoctorProfile = () => {
  const navigate = useNavigate();
  const doctorId = useAuthStore((state) => state.user?._id);
  const [profile, setProfile] = useState<DoctorProfileData | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    async function fetchDoctorProfile() {
      try {
        const res = await axiosInstance.get(`${APIUserRoutes.USER_PROFILE}/${doctorId}`);
        const { user, profile: profileData } = res.data.data;
        setProfile({
          name: user?.name || "",
          email: user?.email || "",
          profilePhoto: user?.photo || "",
          signature: user?.signature || "",
          specialization: profileData?.specialization || "",
          educationDetails: profileData?.educationDetails || "",
          registrationNumber: profileData?.registrationNumber || "",
          registrationYear: profileData?.registrationYear || "",
          yearOfExperience: profileData?.yearOfExperience || 0,
          fee: profileData?.fee || 0,
          about: profileData?.about || "",
          proofDocument: profileData?.proofDocuments?.[0] || "",
        });
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        setProfile({
          name: "",
          email: "",
          profilePhoto: "",
          signature: "",
          specialization: "",
          educationDetails: "",
          registrationNumber: "",
          registrationYear: "",
          yearOfExperience: 0,
          fee: 0,
          about: "",
          proofDocument: "",
        });
      }
    }

    fetchDoctorProfile();
  }, [doctorId]);

  if (!profile) return <div className="p-8 text-gray-600">Loading profile...</div>;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />
      <div className="flex flex-1 w-full">
        <aside className="hidden md:block w-full md:w-64 bg-white border-r border-gray-200">
          <Sidebar />
        </aside>
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 mt-12 bg-gradient-to-br from-blue-100 to-indigo-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 hover:scale-102 transition duration-300">
            <h1 className="text-2xl font-semibold text-gray-700">My Profile</h1>
            <button
              onClick={() => navigate(`/edit-profile-doctor/${doctorId}`)}
              className="w-full sm:w-auto bg-[#5F6FFF] text-white px-6 py-2 rounded-lg hover:bg-[#4a54e1] hover:scale-105 transition"
            >
              Edit Profile
            </button>
          </div>
          <div className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 hover:scale-102 transition duration-300">
            <div className="flex justify-center sm:justify-start">
              <img
                src={profile.profilePhoto || "/default-avatar.png"}
                alt={profile.name || "Doctor"}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[#C9D8FF] shadow-sm"
              />
            </div>
            <div className="flex-1 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 text-[#262626]">
              <div>
                <p className="text-sm text-[#5C5C5C]">Full Name</p>
                <p className="font-medium">{profile.name || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Email</p>
                <p className="font-medium">{profile.email || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Specialization</p>
                <p className="font-medium">{profile.specialization || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Education</p>
                <p className="font-medium">{profile.educationDetails || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Registration No.</p>
                <p className="font-medium">{profile.registrationNumber || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Registration Year</p>
                <p className="font-medium">{profile.registrationYear || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Experience</p>
                <p className="font-medium">{profile.yearOfExperience || 0} years</p>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">Consultation Fee</p>
                <p className="font-medium">₹{profile.fee || 0}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-[#5C5C5C]">About</p>
                <p className="font-medium">{profile.about || "-"}</p>
              </div>
              {profile.proofDocument && (
                <div className="md:col-span-2 mt-2">
                  <p className="text-sm text-[#5C5C5C] mb-1">Proof Document</p>
                  <a
                    href={`/api/proxy-image?url=${encodeURIComponent(profile.proofDocument)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#5F6FFF] text-white px-5 py-2 rounded-lg hover:bg-[#4a54e1] transition text-sm font-medium"
                  >
                    View Proof Document
                  </a>
                </div>
              )}
              {profile.signature && (
                <div className="md:col-span-2 mt-2">
                  <p className="text-sm text-[#5C5C5C] mb-1">Signature</p>
                  <img
                    src={profile.signature}
                    alt="Doctor Signature"
                    className="w-32 h-16 object-contain border rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfile;