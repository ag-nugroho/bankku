import { useState } from 'react';
import { Camera } from 'lucide-react';
import InputField from './InputField';
import SelectField from './SelectField';

const EditProfile = ({ formData, handleInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
            <Camera size={12} />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Your Name"
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
          placeholder="Your Name"
        />
        <InputField
          label="User Name"
          value={formData.username}
          onChange={(value) => handleInputChange('username', value)}
          placeholder="User Name"
        />
        <InputField
          label="Email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          placeholder="Email"
          type="email"
        />
        <InputField
          label="Password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          placeholder="Password"
          showToggle={true}
          showState={showPassword}
          onToggleShow={() => setShowPassword(!showPassword)}
        />
        <SelectField
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(value) => handleInputChange('dateOfBirth', value)}
          options={[
            { value: '25 January 1990', label: '25 January 1990' },
            { value: '26 January 1990', label: '26 January 1990' },
            { value: '27 January 1990', label: '27 January 1990' }
          ]}
        />
        <InputField
          label="Present Address"
          value={formData.presentAddress}
          onChange={(value) => handleInputChange('presentAddress', value)}
          placeholder="Present Address"
        />
        <InputField
          label="Permanent Address"
          value={formData.permanentAddress}
          onChange={(value) => handleInputChange('permanentAddress', value)}
          placeholder="Permanent Address"
        />
        <InputField
          label="City"
          value={formData.city}
          onChange={(value) => handleInputChange('city', value)}
          placeholder="City"
        />
        <InputField
          label="Postal Code"
          value={formData.postalCode}
          onChange={(value) => handleInputChange('postalCode', value)}
          placeholder="Postal Code"
        />
        <InputField
          label="Country"
          value={formData.country}
          onChange={(value) => handleInputChange('country', value)}
          placeholder="Country"
        />
      </div>
    </div>
  );
};

export default EditProfile;