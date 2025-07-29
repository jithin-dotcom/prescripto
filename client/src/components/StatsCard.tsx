

import { motion } from "framer-motion";

export const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}> = ({ title, value, icon, trend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && (
          <p className="text-sm font-medium mt-2 text-blue-600">
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 rounded-lg bg-blue-50">
        {icon}
      </div>
    </div>
  </motion.div>
);