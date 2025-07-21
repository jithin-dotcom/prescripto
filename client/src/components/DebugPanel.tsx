import React from "react";

type DebugPanelProps = {
  logs: string[];
};

const DebugPanel: React.FC<DebugPanelProps> = ({ logs }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-black/80 text-green-400 text-xs p-2 max-h-40 overflow-y-auto font-mono z-50">
      <h2 className="font-bold mb-1">🧪 Debug Panel</h2>
      <ul className="space-y-0.5">
        {logs.map((log, index) => (
          <li key={index}>• {log}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebugPanel;
