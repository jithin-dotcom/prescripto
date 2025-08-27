
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import Sidebar from '../../components/SideBarAdmin';
import Navbar from '../../components/NavbarAdmin';
import Pagination from '../../components/Pagination';
import dayjs from 'dayjs';
import type{ IHistoryData } from '../../interfaces/IPatientHistory';



const PatientHistory: React.FC = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [historyData, setHistoryData] = useState<IHistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const patientId = state?.patientId ;
  
  const isValidObjectId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  useEffect(() => {
    const fetchPatientHistory = async () => {
      if (!patientId || !isValidObjectId(patientId)) {
        setError('Invalid patient ID. Please check and try again.');
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get(`/patient-history/${patientId}?page=${page}&limit=${pageSize}`);
        setHistoryData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch patient history', error);
        setError('Failed to load patient history. The patient may not exist or there was a server error.');
        setLoading(false);
      }
    };
    fetchPatientHistory();
  }, [patientId, page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLoading(true);
    setError(null);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
    setLoading(true);
    setError(null);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
        <motion.div
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Retry
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!historyData || !historyData.data || historyData.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 text-lg mb-4">No medical history found for this patient.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const patient = historyData.data[0].patientId;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          
            <motion.div className="bg-white rounded-xl shadow-2xl p-6 mb-8 hover:scale-102 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Patient Information
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <img
                  src={patient.photo}
                  alt="Patient"
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{patient.name}</p>
                  <p className="text-gray-500 text-sm">{patient.email}</p>
                  <p className="text-gray-500 text-sm">
                    Joined: {dayjs(patient.createdAt).format('DD-MM-YYYY')}
                  </p>
                </div>
              </div>
            </motion.div>

           
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Medical History</h2>
            {historyData.data.map((record) => (
              <motion.div
                key={record._id}
                className="bg-white rounded-xl shadow-2xl p-6 mb-6 hover:scale-102 transition duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                      Appointment Details
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Appointment No:</span>{' '}
                        {record.appointmentId.appointmentNo}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span> {record.appointmentId.day}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span> {record.appointmentId.time}
                      </p>
                    </div>
                  </div>

                
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                      Prescription Details
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                      </p>
                      <p>
                        <span className="font-medium">Advice:</span> {record.notes}
                      </p>
                      {record.followUpDate && (
                        <p>
                          <span className="font-medium">Follow-Up Date:</span>{' '}
                          {dayjs(record.followUpDate).format('DD-MM-YYYY, hh:mm A')}
                        </p>
                      )}
                      <div>
                        <span className="font-medium">Medicines:</span>
                        <ul className="list-disc ml-6 mt-1">
                          {record.medicines.map((med) => (
                            <li key={med._id}>
                              {med.name} - {med.dosage} - {med.frequency} - {med.duration} -{' '}
                              {med.instructions}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
               
              </motion.div>
            ))}

           
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(historyData.total / pageSize)}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PatientHistory;