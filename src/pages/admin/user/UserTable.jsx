const UserTable = ({ users, loading }) => {
  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  if (!users.length) {
    return <p className="text-gray-500">No users found.</p>;
  }

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Credits</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border">{user.accountStatus}</td>
              <td className="p-3 border">
                {user.firstName} {user.lastName}
              </td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.role}</td>
              <td className="p-3 border text-center">{user.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
