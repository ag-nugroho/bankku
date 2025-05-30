// RepayModal.jsx
import React, { useState, useEffect } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";

const RepayModal = ({ isOpen, onClose, loan, onPaymentSuccess }) => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPaymentAmount("");
      setPaymentDone(false);
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setPaymentDone(true);
    onPaymentSuccess(loan, paymentAmount);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const generateTransactionId = () => {
    return `TX-${Math.floor(Math.random() * 900000) + 100000}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto">
        {!paymentDone ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Repay Loan</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            {/* Loan Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Loan ID:</span>
                <span className="text-sm font-medium text-gray-900">{loan?.slNo?.replace(".", "") || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Original Amount:</span>
                <span className="text-sm font-medium text-gray-900">{loan?.loanMoney || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Left to Repay:</span>
                <span className="text-sm font-medium text-gray-900">{loan?.leftToRepay || "N/A"}</span>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmitPayment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter amount"
                  required
                  disabled={isProcessing}
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing || !paymentAmount}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center p-6">
            {/* Success Icon */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">$</div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle size={16} className="text-white" fill="currentColor" />
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-8">
              You've paid <span className="text-green-600 font-semibold">${parseFloat(paymentAmount).toLocaleString()}</span> to Loan {loan?.slNo?.replace(".", "") || ""}
            </p>

            {/* Transaction Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID:</span>
                <span className="text-gray-900 font-medium">{generateTransactionId()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-900 font-medium">{getCurrentDateTime()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="text-green-600 font-medium">Completed</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepayModal;
