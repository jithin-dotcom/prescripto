


import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

export const RateDoctor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const savedData = sessionStorage.getItem('ratingData');
    if (savedData) {
      const { appointmentId, doctorId, userId } = JSON.parse(savedData);
      setAppointmentId(appointmentId);
      setDoctorId(doctorId);
      setUserId(userId);
    } else {
      toast.error('Missing rating data.');
      navigate('/my-appointments');
    }

    const params = new URLSearchParams(location.search);
    if (params.get('rate') !== 'true') {
      params.set('rate', 'true');
      navigate({ pathname: '/rate-doctor', search: params.toString() }, { replace: true });
    }
  }, [location.search, navigate]);

  const handleClose = () => {
    navigate('/my-appointments');
  };

  const handleSubmit = async () => {
       
    if (!rating || !appointmentId || !userId || !doctorId) {
      toast.error('Missing required data for rating.');
      return;
    }

    try {
      const res = await axiosInstance.post('/rate-doctor', {
        appointmentId,
        userId,
        doctorId,
        rating,
        review,
      });

      console.log('res : ', res);
      toast.success('Thank you for your feedback!');
    
      handleClose();
    } catch (err) {
      console.error(err);
    
    }
  };

  const isOpen = new URLSearchParams(location.search).get('rate') === 'true';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Rate your doctor</h2>
              <button onClick={handleClose}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">How was your consultation experience?</p>

            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hover || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience (optional)"
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6"
            />

            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Later
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={rating === 0}
                className={`px-4 py-2 text-white rounded-lg ${
                  rating === 0
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Rate
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

