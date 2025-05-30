import { useState } from 'react';
import InputField from './InputField';
import ToggleSwitch from './ToggleSwitch';

const Secure = ({ securityData, handleSecurityChange }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Two-factor Authentication */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Two-factor Authentication</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Enable or disable two factor authentication</span>
          <ToggleSwitch
            enabled={securityData.twoFactorAuth}
            onChange={(value) => handleSecurityChange('twoFactorAuth', value)}
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <InputField
            label="Current Password"
            value={securityData.currentPassword}
            onChange={(value) => handleSecurityChange('currentPassword', value)}
            placeholder="••••••••••"
            showToggle={true}
            showState={showCurrentPassword}
            onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
          />
          <InputField
            label="New Password"
            value={securityData.newPassword}
            onChange={(value) => handleSecurityChange('newPassword', value)}
            placeholder="••••••••••"
            showToggle={true}
            showState={showNewPassword}
            onToggleShow={() => setShowNewPassword(!showNewPassword)}
          />
        </div>
      </div>
    </div>
  );
};

export default Secure;