import React from "react";
import CreditCard from "../components/dashboard/CreditCard";
import WeeklyActivity from "../components/dashboard/WeeklyActivity";
import ExpenseStatistics from "../components/dashboard/ExpenseStatistics";
import BalanceHistory from "../components/dashboard/BalanceHistory";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import RecentTransaction from "../components/dashboard/RecentTransaction";

const Dashboard = () => {
  const cardData = [
    {
      balance: 5756,
      cardNumber: "3778 2345 8523 1234",
      holder: "Eddy Cusuma",
      expiry: "12/22",
      variant: "blue",
    },
    {
      balance: 5756,
      cardNumber: "3778 2345 8523 1234",
      holder: "Eddy Cusuma",
      expiry: "12/22",
      variant: "gray",
    },
  ];

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="hidden md:grid md:grid-cols-12 gap-4 lg:gap-6">
        <div className="md:col-span-7 lg:col-span-8 space-y-4 lg:space-y-6">
          {/* My Cards Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">My Cards</h2>
              <button className="text-gray-600 hover:text-gray-900 font-medium text-sm md:text-base">See All</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {cardData.map((card, index) => (
                <CreditCard key={index} balance={card.balance} cardNumber={card.cardNumber} holder={card.holder} expiry={card.expiry} variant={card.variant} isActive={index === 0} />
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Weekly Activity</h3>
            <WeeklyActivity />
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4 space-y-4 lg:space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">Recent Transaction</h3>
            </div>
            <RecentTransaction className="" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Expense Statistics</h3>
            <ExpenseStatistics />
          </div>
        </div>

        <div className="md:col-span-12 mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Quick Transfer</h3>
            <QuickTransfer />
          </div>

          <div className="lg:col-span-7 space-y-4 lg:space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Balance History</h3>
              <BalanceHistory />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {/* My Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">My Cards</h2>
            <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">See All</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {cardData.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-80 max-w-[85vw]">
                <CreditCard balance={card.balance} cardNumber={card.cardNumber} holder={card.holder} expiry={card.expiry} variant={card.variant} isActive={index === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transaction */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">Recent Transaction</h3>
          </div>
          <RecentTransaction />
        </div>

        {/* Weekly Activity */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Weekly Activity</h3>
          <WeeklyActivity />
        </div>

        {/* Expense Statistics */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Expense Statistics</h3>
          <ExpenseStatistics />
        </div>

        {/* Quick Transfer */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Quick Transfer</h3>
          <QuickTransfer />
        </div>

        {/* Balance History */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">Balance History</h3>
          <BalanceHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
