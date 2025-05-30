import { Search, Bell, Settings, Menu, ChevronDown, X, Check, AlertCircle, User, DollarSign } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onMenuClick, pageTitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'transaction',
      title: 'Payment Received',
      message: 'You received $1,200 from John Doe',
      time: '2 minutes ago',
      isRead: false,
      icon: DollarSign,
      iconColor: 'text-green-500'
    },
    {
      id: 2,
      type: 'loan',
      title: 'Loan Payment Due',
      message: 'Your loan payment of $500 is due tomorrow',
      time: '1 hour ago',
      isRead: false,
      icon: AlertCircle,
      iconColor: 'text-orange-500'
    },
    {
      id: 3,
      type: 'account',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated',
      time: '3 hours ago',
      isRead: true,
      icon: User,
      iconColor: 'text-blue-500'
    },
    {
      id: 4,
      type: 'transaction',
      title: 'Card Transaction',
      message: 'Card ending in 1234 was used for $89.99 at Amazon',
      time: '5 hours ago',
      isRead: true,
      icon: DollarSign,
      iconColor: 'text-blue-500'
    },
    {
      id: 5,
      type: 'system',
      title: 'Security Alert',
      message: 'New device login detected from Chrome on Windows',
      time: '1 day ago',
      isRead: true,
      icon: AlertCircle,
      iconColor: 'text-red-500'
    }
  ]);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    closeDropdown();
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({ ...notification, isRead: true })
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={onMenuClick} 
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center">
            {pageTitle}
          </h1>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-1 rounded-full hover:bg-gray-50 transition-colors"
              type="button"
            >
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent hover:ring-blue-200 transition-all"
              />
            </button>

            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 transform transition-all duration-200 ease-out origin-top-right ${
              isDropdownOpen 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900">Agung Nugroho</div>
                <div className="text-sm text-gray-500">agung@example.com</div>
              </div>
              
              <ul className="py-1">
                <li>
                  <button 
                    onClick={() => handleNavigation('/dashboard')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/loans')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Loans
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/settings')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Settings
                  </button>
                </li>
              </ul>
              
              <div className="border-t border-gray-100 py-1">
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-10" 
                onClick={closeDropdown}
              ></div>
            )}
          </div>
        </div>

        <div className="absolute top-3 right-16">
          <button 
            onClick={toggleNotification} 
            className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <div className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-30 transform transition-all duration-200 ease-out origin-top-right ${
            isNotificationOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                <p className="text-xs text-gray-500">{unreadCount} unread messages</p>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={closeNotification}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full bg-gray-100 ${notification.iconColor}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} className="text-gray-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate('/notifications')}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all notifications
                  </button>
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {isNotificationOpen && (
            <div 
              className="fixed inset-0 z-20" 
              onClick={closeNotification}
            ></div>
          )}
        </div>

        <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for something" 
              className="w-full pl-9 pr-4 py-2.5 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search for something" 
                className="pl-9 pr-4 py-2 w-64 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>

            <button onClick={() => handleNavigation('/settings')} className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <Settings size={18} />
            </button>

            <div className="relative">
              <button 
                onClick={toggleNotification} 
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className={`absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-30 transform transition-all duration-200 ease-out origin-top-right ${
                isNotificationOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">{unreadCount} unread messages</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={closeNotification}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-12 text-center">
                      <Bell size={32} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`px-4 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group ${
                            !notification.isRead ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full bg-gray-100 ${notification.iconColor}`}>
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    {notification.time}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={14} className="text-gray-400" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          navigate('/notifications');
                          closeNotification();
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View all notifications
                      </button>
                      <button
                        onClick={clearAllNotifications}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {isNotificationOpen && (
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={closeNotification}
                ></div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Agung Nugroho</p>
                  <p className="text-xs text-gray-500">Premium User</p>
                </div>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-1 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-blue-200 transition-all"
                  />
                  <ChevronDown className={`w-4 h-4 text-gray-400 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 transform transition-all duration-200 ease-out origin-top-right ${
                isDropdownOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">Agung Nugroho</div>
                  <div className="text-sm text-gray-500">agung@example.com</div>
                </div>
                
                <ul className="py-1">
                  <li className={`transform transition-all duration-150 ${isDropdownOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`} style={{ transitionDelay: isDropdownOpen ? '50ms' : '0ms' }}>
                    <button 
                      onClick={() => handleNavigation('/dashboard')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li className={`transform transition-all duration-150 ${isDropdownOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`} style={{ transitionDelay: isDropdownOpen ? '100ms' : '0ms' }}>
                    <button 
                      onClick={() => handleNavigation('/loans')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Loans
                    </button>
                  </li>
                  <li className={`transform transition-all duration-150 ${isDropdownOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`} style={{ transitionDelay: isDropdownOpen ? '150ms' : '0ms' }}>
                    <button 
                      onClick={() => handleNavigation('/settings')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Settings
                    </button>
                  </li>
                </ul>
                
                <div className="border-t border-gray-100 py-1">
                  <div className={`transform transition-all duration-150 ${isDropdownOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`} style={{ transitionDelay: isDropdownOpen ? '250ms' : '0ms' }}>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {isDropdownOpen && (
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={closeDropdown}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;