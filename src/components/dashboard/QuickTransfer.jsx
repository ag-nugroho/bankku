import React, { useState } from "react";
import { Send, ChevronLeft, ChevronRight, CheckCircle, X } from "lucide-react";

const QuickTransfer = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [amount, setAmount] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transferData, setTransferData] = useState(null);

  const usersPerPage = 3;

  const users = [
    {
      id: 1,
      name: "Livia Bator",
      role: "CEO",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Randy Press",
      role: "Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Workman",
      role: "Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Agung",
      role: "FE",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Chyntia",
      role: "QA",
      avatar: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleTransfer = async () => {
    const amountValue = parseFloat(amount);

    if (!amount || isNaN(amountValue)) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountValue <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    if (!users[selectedUser]) {
      setError("Please select a recipient");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setTransferData({
        amount: amountValue,
        recipient: users[selectedUser].name,
        avatar: users[selectedUser].avatar,
        transactionId: `TX-${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toLocaleString(),
      });

      setShowSuccessModal(true);

      setAmount("");
    } catch (err) {
      setError("Transfer failed. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setTransferData(null);
  };

  const handleSendAgain = () => {
    if (transferData) {
      setAmount(transferData.amount.toString());
    }
    closeModal();
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  React.useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showSuccessModal) {
        closeModal();
      }
    };

    if (showSuccessModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessModal]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* User Selection */}
      <div className="flex items-center justify-between mb-6">
        <button 
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-30" 
          onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))} 
          disabled={startIndex === 0}
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        <div className="flex space-x-4">
          {users.slice(startIndex, startIndex + usersPerPage).map((user, index) => {
            const actualIndex = startIndex + index;
            return (
              <div 
                key={user.id} 
                className={`text-center cursor-pointer transition-all duration-200 ${
                  selectedUser === actualIndex ? "transform scale-105" : ""
                }`} 
                onClick={() => setSelectedUser(actualIndex)}
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden mb-2 border-2 ${
                  selectedUser === actualIndex ? "border-blue-500" : "border-transparent"
                }`}>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            );
          })}
        </div>

        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-30"
          onClick={() => setStartIndex((prev) => Math.min(prev + 1, users.length - usersPerPage))}
          disabled={startIndex + usersPerPage >= users.length}
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Transfer Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-3">Write Amount</label>
          <div className="flex w-full overflow-hidden bg-gray-50 focus-within:ring-4 focus-within:ring-blue-100 border-0 rounded-full">
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              className="flex-grow px-6 py-4 text-xl font-bold text-gray-900 bg-transparent focus:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.00"
              inputMode="decimal"
              min="0"
              step="0.01"
            />
            <button
              onClick={handleTransfer}
              disabled={isSending}
              className={`flex items-center px-6 py-4 font-semibold transition-all duration-200 rounded-full ${
                isSending 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSending ? (
                <span className="flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        <div className="text-center min-h-[24px]">
          {error && (
            <p className="text-red-500 text-sm animate-pulse">{error}</p>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && transferData && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-end p-4 pb-0">
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="px-8 pb-8 pt-4 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src={transferData.avatar} 
                    alt={transferData.recipient} 
                    className="w-24 h-24 rounded-full border-4 border-green-100 mx-auto object-cover" 
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Transfer Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                You've sent{" "}
                <span className="font-bold text-green-600">
                  {formatCurrency(transferData.amount)}
                </span>{" "}
                to{" "}
                <span className="font-bold">{transferData.recipient}</span>
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-3 mb-6">
                <button 
                  onClick={closeModal} 
                  className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Done
                </button>
                <button
                  onClick={handleSendAgain}
                  className="flex-1 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Send Again
                </button>
              </div>

              {/* Transaction Details */}
              <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono text-gray-800">{transferData.transactionId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-800">{transferData.timestamp}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickTransfer;