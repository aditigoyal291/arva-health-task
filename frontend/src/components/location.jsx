// LocationPrompt.js
import React from "react";

const LocationPrompt = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-60 rounded bg-white p-6 shadow-lg">
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-map-pin"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div className="flex flex-col">
            <h2 className="mb-4 text-xl font-bold">We need your location</h2>
            <p className="mb-4">
              Please allow us to access your location to provide better service.
            </p>
            <div className="flex  justify-between">
              <button
                onClick={onClose}
                className="rounded bg-teal-700 px-4 py-2 font-bold text-white hover:bg-teal-800"
              >
                Allow Location Access
              </button>
              <button
                onClick={onClose}
                className="rounded bg-teal-700 px-4 py-2 font-bold text-white hover:bg-teal-800"
              >
                Type Manually
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between"></div>
      </div>
    </div>
  );
};

export default LocationPrompt;
