import { Camera, Eye, EyeOff } from "lucide-react";

// InputField Component
const InputField = ({ label, value, onChange, type = "text", placeholder, showToggle = false, showState = false, onToggleShow }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type={showToggle && !showState ? "password" : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
      />
      {showToggle && (
        <button type="button" onClick={onToggleShow} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showState ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  </div>
);

export default InputField;
