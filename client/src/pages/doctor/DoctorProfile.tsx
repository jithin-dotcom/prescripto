


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar2";
import Sidebar from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";

interface DoctorProfileData {
  name?: string;
  email?: string;
  profilePhoto?: string;
  specialization?: string;
  educationDetails?: string;
  registrationNumber?: string;
  registrationYear?: string;
  yearOfExperience?: number;
  fee?: number;
  about?: string;
  proofDocument?: string;
}

const DoctorProfile = () => {
  const navigate = useNavigate();
  const doctorId = useAuthStore((state) => state.user?._id);
  const [profile, setProfile] = useState<DoctorProfileData | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    async function fetchDoctorProfile() {
      try {
        const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
        const { user, profile: profileData } = res.data.data;

        setProfile({
          name: user?.name || "",
          email: user?.email || "",
          profilePhoto: user?.photo || "",
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-700">My Profile</h1>
            <button
              onClick={() => navigate(`/edit-profile-doctor/${doctorId}`)}
              className="mt-4 sm:mt-0 bg-[#5F6FFF] text-white px-6 py-2 rounded-lg hover:bg-[#4a54e1] hover:scale-105 transition"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white border border-[#C9D8FF] rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 hover:scale-105 transition">
            <div className="flex-shrink-0 self-center sm:self-start">
              <img
                src={profile.profilePhoto || "/default-avatar.png"}
                alt={profile.name || "Doctor"}
                className="w-40 h-40 rounded-full object-cover border-4 border-[#C9D8FF] shadow-sm"
              />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-[#262626]">
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
                    href={profile.proofDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#5F6FFF] text-white px-5 py-2 rounded-lg hover:bg-[#4a54e1] transition text-sm font-medium"
                  >
                    View Proof Document
                  </a>
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
