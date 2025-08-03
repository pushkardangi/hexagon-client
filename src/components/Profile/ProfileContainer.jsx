import { useState } from "react";
import { useAuthStore } from "../../store";
import { User, Coins, Image } from "lucide-react";
import { Link } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import EditableField from "./EditableField";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  // Local state for edit modes
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const handleSave = async (field) => {
    try {
      // Example: call your endpoint to update the field
      // await updateUserField(field, formData[field]);
      console.log(`Saving ${field}:`, formData[field]);
      setEditingField(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader />

      <div className="bg-white rounded-xl shadow p-6 space-y-6 border border-gray-200">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500">Your personal account</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* First Name */}
          <EditableField
            label="First Name"
            value={user?.firstName}
            fieldName="firstName"
            editingField={editingField}
            setEditingField={setEditingField}
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
          />

          {/* Last Name */}
          <EditableField
            label="Last Name"
            value={user?.lastName}
            fieldName="lastName"
            editingField={editingField}
            setEditingField={setEditingField}
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
          />

          {/* Email */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user?.email}</p>
            </div>
          </div>

          {/* Credits */}
          <div className="flex items-center justify-between">
            <Link to="/billing" className="cursor-pointer">
              <p className="text-sm text-gray-500">Credits</p>
              <p className="text-gray-800 flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-500" /> {user?.credits ?? 0}
              </p>
            </Link>
          </div>

          {/* Total Images in Gallery */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Images in Gallery</p>
              <p className="text-gray-800 flex items-center gap-2">
                <Image className="w-4 h-4 text-green-700" /> {user?.imageCount ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
