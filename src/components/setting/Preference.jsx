import SelectField from './SelectField';
import ToggleSwitch from './ToggleSwitch';

const Preferences = ({ 
  preferencesData, 
  handlePreferencesChange, 
  handleNotificationChange 
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Currency"
          value={preferencesData.currency}
          onChange={(value) => handlePreferencesChange('currency', value)}
          options={[
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' },
            { value: 'JPY', label: 'JPY' }
          ]}
        />
        <SelectField
          label="Time Zone"
          value={preferencesData.timezone}
          onChange={(value) => handlePreferencesChange('timezone', value)}
          options={[
            { value: '(GMT-12:00) International Date Line West', label: '(GMT-12:00) International Date Line West' },
            { value: '(GMT-08:00) Pacific Time', label: '(GMT-08:00) Pacific Time' },
            { value: '(GMT-05:00) Eastern Time', label: '(GMT-05:00) Eastern Time' }
          ]}
        />
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">I send or receive digital currency</span>
            <ToggleSwitch
              enabled={preferencesData.notifications.digitalCurrency}
              onChange={(value) => handleNotificationChange('digitalCurrency', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">I receive merchant order</span>
            <ToggleSwitch
              enabled={preferencesData.notifications.merchantOrder}
              onChange={(value) => handleNotificationChange('merchantOrder', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">There are recommendation for my account</span>
            <ToggleSwitch
              enabled={preferencesData.notifications.recommendations}
              onChange={(value) => handleNotificationChange('recommendations', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;