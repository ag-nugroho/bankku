const TabButton = ({ id, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`px-4 py-2 font-medium transition-colors ${
      isActive
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {label}
  </button>
);

export default TabButton;