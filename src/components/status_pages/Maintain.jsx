import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/maintain.json";

function Maintain() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-xl w-full space-y-6">
        <div className="flex justify-center">
          <div className="w-64 md:w-80">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">
          Under Maintenance
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          This page is currently undergoing maintenance. We will be back soon with better updates. Thank you for your understanding.
        </p>
        <p className="text-gray-400 text-sm">
          — Developer Team
        </p>
      </div>
    </div>
  );
}

export default Maintain;
