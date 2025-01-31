import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to fetch users"));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            {user.role === "superadmin" && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              {user.role === "superadmin" && (
                <td className="p-2">
                  <button onClick={() => deleteUser(u._id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
