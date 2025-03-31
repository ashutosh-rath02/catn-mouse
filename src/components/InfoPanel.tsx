import React from "react";

interface InfoPanelProps {
  show: boolean;
}

const information = [
  "Players take turns moving the mouse and cat",
  "Mouse moves first, then cat",
  "Click on highlighted nodes to move",
  "Both pieces can only move along connected paths",
  "Cat wins by catching the mouse",
  "Mouse wins by surviving 5 complete rounds",
];

export const InfoPanel: React.FC<InfoPanelProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div
      className={`
      bg-indigo-50/95 backdrop-blur-sm px-6 py-4 border-b border-indigo-200
      transition-all duration-300 ease-in-out
      ${show ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}
    `}
    >
      <h2 className="font-bold text-xl text-indigo-900 mb-3">How to Play:</h2>
      <ul className="list-disc list-inside space-y-2 text-indigo-800">
        {information.map((info, index) => (
          <li
            key={index}
            className="transition-all duration-200 hover:translate-x-1"
          >
            {info}
          </li>
        ))}
      </ul>
    </div>
  );
};
