

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { useAuthStore } from '../../store/authStore';
import NavbarAdmin from '../../components/NavbarAdmin';
import SidebarAdmin from '../../components/SideBarAdmin';
import RatingsList from '../../components/RatingsList';
import type { RatingResponse } from '../../interfaces/IDoctorRatings';
import { APIRoutes } from '../../constants/routes.constants';

const AdminRatingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const role = user?.role;
  const navigate = useNavigate();
  const [data, setData] = useState<RatingResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const doctorId = sessionStorage.getItem('doctorId');

  useEffect(() => {
    if (role !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setIsLoading(false);
      return;
    }
    if (!doctorId) {
      setError('No doctor selected. Please select a doctor to view ratings.');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get<RatingResponse>(
           `${APIRoutes.GET_RATING}/${doctorId}?page=${currentPage}&limit=${pageSize}`
        );
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setError('Failed to load ratings. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchData();
  }, [role, doctorId, currentPage, pageSize]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      <NavbarAdmin />
      <div className="flex flex-1">
        <div className="md:w-64 lg:w-72 shrink-0">
          <SidebarAdmin />
        </div>
        <div className="flex-1 p-6 space-y-8 overflow-y-auto">
          <RatingsList
            data={data}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminRatingsPage;