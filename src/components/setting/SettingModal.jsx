import { CheckCircle, X } from "lucide-react";

const SettingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500" size={32} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Saved Succesfully!</h2>

          <p className="text-gray-600 mb-8">All your settings have been successfully saved.</p>

          <button onClick={onClose} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;