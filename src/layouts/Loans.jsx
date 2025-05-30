// Loans.jsx
import React, { useState } from "react";
import { User, Building2, TrendingUp, Banknote } from "lucide-react";
import RepayModal from "../components/loans/RepayModal";

const Loans = () => {
  const loanCards = [
    {
      title: "Personal Loans",
      amount: "$50,000",
      icon: User,
      cardBgColor: "bg-white",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-gray-200",
    },
    {
      title: "Corporate Loans",
      amount: "$100,000",
      icon: Building2,
      cardBgColor: "bg-white",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-gray-200",
    },
    {
      title: "Business Loans",
      amount: "$500,000",
      icon: TrendingUp,
      cardBgColor: "bg-white",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      borderColor: "border-gray-200",
    },
    {
      title: "Custom Loans",
      amount: "Choose Money",
      icon: Banknote,
      cardBgColor: "bg-white",
      iconBgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      borderColor: "border-gray-200",
    },
  ];

  const [activeLoans, setActiveLoans] = useState([
    {
      id: "loan01",
      slNo: "01.",
      loanMoney: "$100,000",
      leftToRepay: "$40,500",
      duration: "8 Months",
      interestRate: "12%",
      installment: "$2,000 / month",
    },
    {
      id: "loan02",
      slNo: "02.",
      loanMoney: "$500,000",
      leftToRepay: "$250,000",
      duration: "36 Months",
      interestRate: "10%",
      installment: "$8,000 / month",
    },
    {
      id: "loan03",
      slNo: "03.",
      loanMoney: "$900,000",
      leftToRepay: "$40,500",
      duration: "12 Months",
      interestRate: "12%",
      installment: "$5,000 / month",
    },
    {
      id: "loan04",
      slNo: "04.",
      loanMoney: "$50,000",
      leftToRepay: "$40,500",
      duration: "25 Months",
      interestRate: "5%",
      installment: "$2,000 / month",
    },
    {
      id: "loan05",
      slNo: "05.",
      loanMoney: "$50,000",
      leftToRepay: "$40,500",
      duration: "5 Months",
      interestRate: "16%",
      installment: "$10,000 / month",
    },
    {
      id: "loan06",
      slNo: "06.",
      loanMoney: "$80,000",
      leftToRepay: "$25,500",
      duration: "14 Months",
      interestRate: "8%",
      installment: "$2,000 / month",
    },
    {
      id: "loan07",
      slNo: "07.",
      loanMoney: "$12,000",
      leftToRepay: "$5,500",
      duration: "9 Months",
      interestRate: "13%",
      installment: "$500 / month",
    },
    {
      id: "loan08",
      slNo: "08.",
      loanMoney: "$160,000",
      leftToRepay: "$100,800",
      duration: "3 Months",
      interestRate: "12%",
      installment: "$900 / month",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleOpenRepayModal = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  const handlePaymentSuccess = (paidLoan, amountPaid) => {
    console.log(`Payment of ${amountPaid} for loan ${paidLoan.slNo} successful.`);
    setActiveLoans(prevLoans => 
      prevLoans.map(loan => {
        if (loan.id === paidLoan.id) {
          const currentLeft = parseFloat(loan.leftToRepay.replace(/[^0-9.-]+/g,""));
          const newLeft = currentLeft - parseFloat(amountPaid);
          return { ...loan, leftToRepay: `$${newLeft.toLocaleString()}` };
        }
        return loan;
      })
    );
  };

  const calculateTotals = () => {
    let totalMoney = 0;
    let totalLeft = 0;
    let totalInst = 0;

    activeLoans.forEach((loan) => {
      totalMoney += parseFloat(loan.loanMoney.replace(/[^0-9.-]+/g, ""));
      totalLeft += parseFloat(loan.leftToRepay.replace(/[^0-9.-]+/g, ""));
    });

    return {
      totalLoanMoney: `$${activeLoans.reduce((sum, loan) => sum + parseFloat(loan.loanMoney.replace(/[^0-9.-]+/g, "")), 0).toLocaleString()}`,
      totalLeftToRepay: `$${activeLoans.reduce((sum, loan) => sum + parseFloat(loan.leftToRepay.replace(/[^0-9.-]+/g, "")), 0).toLocaleString()}`,
      totalInstallment: "$50,000 / month",
    };
  };

  const totals = calculateTotals();
  const totalLoanMoney = totals.totalLoanMoney;
  const totalLeftToRepay = totals.totalLeftToRepay;
  const totalInstallment = totals.totalInstallment;

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Loan Overview Cards - Horizontal Scroll di Mobile */}
      <div className="flex overflow-x-auto pb-4 space-x-4 mb-6 lg:mb-8 hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6 sm:overflow-visible sm:space-x-0">
        {loanCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`min-w-[260px] flex-shrink-0 ${card.cardBgColor} ${card.borderColor} border rounded-2xl p-4 lg:p-6 hover:shadow-md transition-shadow duration-200 sm:min-w-0`}>
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 ${card.iconBgColor} rounded-full flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 lg:w-7 lg:h-7 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-sm lg:text-base text-gray-600">{card.title}</h3>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{card.amount}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Loans Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Active Loans Overview</h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SL No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Loan Money</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Left to repay</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Interest rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Installment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Repay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeLoans.map(
                (
                  loan
                ) => (
                  <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                    {" "}
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.slNo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{loan.loanMoney}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.leftToRepay}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.interestRate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.installment}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenRepayModal(loan)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">
                        Repay
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 text-sm font-semibold text-red-600">Total</td>
                <td className="px-6 py-4 text-sm font-semibold text-red-600">{totalLoanMoney}</td>
                <td className="px-6 py-4 text-sm font-semibold text-red-600">{totalLeftToRepay}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-sm font-semibold text-red-600">{totalInstallment}</td>
                <td className="px-6 py-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {activeLoans.map(
            (
              loan
            ) => (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900"></span>
                  <button
                    onClick={() => handleOpenRepayModal(loan)}
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-50 transition-colors">
                    Repay
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Loan Money</p>
                    <p className="font-medium text-gray-900">{loan.loanMoney}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Left to repay</p>
                    <p className="font-medium text-gray-900">{loan.leftToRepay}</p>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Mobile Total */}
          <div className="p-4 bg-red-50 border-t-2 border-red-200">
            <h3 className="text-sm font-semibold text-red-600 mb-3">Total</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-red-600">{totalLoanMoney}</p>
              </div>
              <div>
                <p className="font-semibold text-red-600">{totalLeftToRepay}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Payment */}
      {selectedLoan && <RepayModal isOpen={isModalOpen} onClose={handleCloseModal} loan={selectedLoan} onPaymentSuccess={handlePaymentSuccess} />}
    </div>
  );
};

export default Loans;