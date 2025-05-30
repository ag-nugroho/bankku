import React from "react";
import { CreditCard as CardIcon } from "lucide-react";
import chip1 from "../../assets/chip-card.svg";
import chip2 from "../../assets/chip-card1.svg";

const CreditCard = ({ balance, cardNumber, holder, expiry, isActive = false, variant = "blue" }) => {
  const cardVariants = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
    gray: "bg-gradient-to-br from-white-100 to-white-200 text-gray-700 border border-gray-300",
  };

  const formatCardNumber = (num) => {
    if (typeof num !== "string") num = String(num);
    const first = num.substring(0, 4);
    const last = num.substring(num.length - 4);
    return `${first} **** **** ${last}`;
  };

  return (
    <div className={`p-6 rounded-2xl shadow-sm ${cardVariants[variant]} relative overflow-hidden dashboard-card cursor-pointer`}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="w-full h-full rounded-full border-2 border-white transform translate-x-8 -translate-y-8"></div>
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-2 border-white opacity-50"></div>
      </div>

      <div className="absolute top-4 right-4 flex items-center">
        <img src={variant === "blue" ? chip1 : chip2} alt="Chip" className="w-8 h-8 mr-2" />
        {isActive && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>}
      </div>

      {/* Card Content */}
      <div className="items-center justify-between mb-6">
        {/* Balance */}
        <div className="mb-6">
          <p className="text-sm opacity-80 mb-1">Balance</p>
          <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
        </div>

        {/* Card Details */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm opacity-80 mb-1">CARD HOLDER</p>
            <p className="font-semibold text-sm">{holder}</p>
          </div>
          <div>
            <p className="text-sm opacity-80 mb-1">VALID THRU</p>
            <p className="font-semibold text-sm">{expiry}</p>
          </div>
        </div>

        {/* Card Number */}
        <div className="mt-6 mb-4">
          <p className="text-lg font-mono tracking-wider">{formatCardNumber(cardNumber)}</p>
        </div>

        {/* Card Icon */}
        <div className="flex justify-end">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full -ml-2 ${variant === "blue" ? "bg-white opacity-20 mix-blend-screen" : "bg-gray-400 opacity-40"}`}></div>
            <div className={`w-8 h-8 rounded-full -ml-4 ${variant === "blue" ? "bg-white opacity-20 mix-blend-screen" : "bg-gray-500 opacity-40"}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
