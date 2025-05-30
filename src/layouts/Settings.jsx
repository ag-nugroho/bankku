import TabButton from "../components/setting/TabButton";
import EditProfile from "../components/setting/EditProfile";
import Preference from "../components/setting/Preference";
import Secure from "../components/setting/Secure";
import { useState } from "react";
import SettingModal from "../components/setting/SettingModal";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "Charlene Reed ",
    username: "Charlene Reed ",
    email: "charlenereed@gmail.com",
    password: "••••••••••",
    dateOfBirth: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
  });

  const [securityData, setSecurityData] = useState({
    twoFactorAuth: true,
    currentPassword: "",
    newPassword: "",
  });

  const [preferencesData, setPreferencesData] = useState({
    currency: "USD",
    timezone: "(GMT-12:00) International Date Line West",
    notifications: {
      digitalCurrency: true,
      merchantOrder: false,
      recommendations: true,
    },
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferencesChange = (field, value) => {
    setPreferencesData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setPreferencesData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }));
  };

  const handleSave = () => {
    console.log("Saving settings...", { formData, securityData, preferencesData });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <TabButton id="edit-profile" label="Edit Profile" isActive={activeTab === "edit-profile"} onClick={setActiveTab} />
          <TabButton id="preferences" label="Preferences" isActive={activeTab === "preferences"} onClick={setActiveTab} />
          <TabButton id="security" label="Security" isActive={activeTab === "security"} onClick={setActiveTab} />
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === "edit-profile" && <EditProfile formData={formData} handleInputChange={handleInputChange} />}
        {activeTab === "security" && <Secure securityData={securityData} handleSecurityChange={handleSecurityChange} />}
        {activeTab === "preferences" && <Preference preferencesData={preferencesData} handlePreferencesChange={handlePreferencesChange} handleNotificationChange={handleNotificationChange} />}
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button onClick={handleSave} className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Save
        </button>
      </div>

      <SettingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Settings;
