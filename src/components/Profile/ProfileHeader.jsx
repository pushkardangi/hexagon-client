import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";

const ProfileHeader = () => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user.role === "admin";

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Your Profile</h1>

      {isAdmin && (
        <div className="px-2">
          <Link
            to="/admin/dashboard"
            className="px-2 py-1 text-sm bg-gray-500 hover:bg-gray-400 text-white rounded-md transition-colors"
          >
            Admin
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
