import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './layouts/SideBar';
import Header from './layouts/Header';
import Dashboard from './layouts/Dashboard';
import Loans from './layouts/Loans';
import Settings from './layouts/Settings';
import Maintain from './components/status_pages/Maintain';
import './App.css';

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    const titleMap = {
      '/dashboard': 'Overview',
      '/transactions': 'Transactions',
      '/accounts': 'Accounts',
      '/investments': 'Investments',
      '/credit-cards': 'Credit Cards',
      '/loans': 'Loans',
      '/services': 'Services',
      '/privileges': 'My Privileges',
      '/settings': 'Settings'
    };
    return titleMap[pathname] || 'Overview';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Header 
          onMenuClick={handleMobileMenuToggle} 
          pageTitle={getPageTitle(location.pathname)}
        />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Maintain />} />
            <Route path="/accounts" element={<Maintain />} />
            <Route path="/investments" element={<Maintain />} />
            <Route path="/credit-cards" element={<Maintain />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/services" element={<Maintain />} />
            <Route path="/privileges" element={<Maintain />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;