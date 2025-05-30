import React from 'react';
import { ArrowUpRight, ArrowDownLeft, User } from 'lucide-react';

const RecentTransaction = () => {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      description: 'Deposit from my Card',
      date: '28 January 2021',
      amount: 850,
      icon: 'card'
    },
    {
      id: 2,
      type: 'deposit',
      description: 'Deposit Paypal',
      date: '25 January 2021',
      amount: 2500,
      icon: 'paypal'
    },
    {
      id: 3,
      type: 'transfer',
      description: 'Jemi Wilson',
      date: '21 January 2021',
      amount: 5400,
      icon: 'user'
    }
  ];

  const getIcon = (iconType, transactionType) => {
    const iconClass = `w-10 h-10 rounded-full flex items-center justify-center`;
    
    if (iconType === 'card') {
      return (
        <div className={`${iconClass} bg-yellow-100`}>
          <div className="w-6 h-4 bg-yellow-500 rounded-sm"></div>
        </div>
      );
    } else if (iconType === 'paypal') {
      return (
        <div className={`${iconClass} bg-blue-100`}>
          <span className="text-blue-600 font-bold text-sm">P</span>
        </div>
      );
    } else {
      return (
        <div className={`${iconClass} bg-green-100`}>
          <User size={20} className="text-green-600" />
        </div>
      );
    }
  };

  const getAmountDisplay = (amount, type) => {
    const isPositive = type === 'deposit';
    return (
      <div className="text-right">
        <p className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : '-'}${amount.toLocaleString()}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 dashboard-card">
      
      <div className="items-center justify-between mb-11">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              {getIcon(transaction.icon, transaction.type)}
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            {getAmountDisplay(transaction.amount, transaction.type)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;