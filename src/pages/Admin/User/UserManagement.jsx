import useSWR from "swr";
import UserTable from "./UserTable";
import { fetchAllUsers } from "../../../api";

const UserManagement = () => {
  const { data, error, isLoading } = useSWR("users", fetchAllUsers);
  // const paginationData = data.pagination; // comment

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users!</div>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <UserTable users={data?.users || []} loading={isLoading} />
    </div>
  );
};

export default UserManagement;
