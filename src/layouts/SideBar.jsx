import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Receipt, 
  User, 
  TrendingUp, 
  Wallet, 
  Gift, 
  Settings,
  Crown,
  X
} from 'lucide-react';

import logo from "../assets/logo.svg";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: Receipt, path: '/transactions' },
    { id: 'accounts', label: 'Accounts', icon: User, path: '/accounts' },
    { id: 'investments', label: 'Investments', icon: TrendingUp, path: '/investments' },
    { id: 'credit-cards', label: 'Credit Cards', icon: CreditCard, path: '/credit-cards' },
    { id: 'loans', label: 'Loans', icon: Wallet, path: '/loans' },
    { id: 'services', label: 'Services', icon: Gift, path: '/services' },
    { id: 'privileges', label: 'My Privileges', icon: Crown, path: '/privileges' },
    { id: 'setting', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleItemClick = (path) => {
    navigate(path);
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const isActiveItem = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-blur bg-opacity-300 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 
        w-64 bg-white h-screen shadow-lg flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-sm"><img src={logo}/></span>
              </div>
              <span className="text-xl font-bold text-gray-800">Bankku.</span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 md:px-4 py-4 md:py-6 overflow-y-auto">
          <div className="space-y-1 md:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveItem(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 md:px-4 py-2.5 md:py-3 text-left rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} className={`${isActive ? 'text-blue-600' : ''}`} />
                  <span className={`font-medium text-sm md:text-base ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;