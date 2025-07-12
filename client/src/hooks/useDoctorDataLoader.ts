

// hooks/useDoctorDataLoader.ts
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useDoctorStore } from "../store/doctorStore";
import axiosInstance from "../utils/axios";

export const useDoctorDataLoader = () => {
  const doctorId = useAuthStore((state) => state.user?._id);
  const setDoctorData = useDoctorStore((state) => state.setDoctorData);

  useEffect(() => {
    if (!doctorId) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
        const { user, profile } = res.data.data;

        setDoctorData({
          name: user.name,
          photo: user.photo,
          fee: profile.fee,
          isVerified: user.isVerified,
          isBlocked: user.isBlocked,
          educationDetails: profile.educationDetails,
          specialization: profile.specialization,
          yearOfExperience: profile.yearOfExperience,
        });
      } catch (err) {
        console.error("Failed to load doctor data:", err);
      }
    })();
  }, [doctorId]);
};
