

import React from "react";
import { Phone, PhoneOff } from "lucide-react";

interface Props {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallPopup: React.FC<Props> = ({ callerName, onAccept, onReject }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white shadow-lg border border-gray-200 p-4 rounded-lg flex flex-col items-center space-y-3">
      <p className="text-sm font-medium">{callerName} is calling...</p>
      <div className="flex gap-4">
        <button onClick={onAccept} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full">
          <Phone size={18} />
        </button>
        <button onClick={onReject} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full">
          <PhoneOff size={18} />
        </button>
      </div>
    </div>
  );
};

export default IncomingCallPopup;
