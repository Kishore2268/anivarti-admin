import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaUsers, FaClipboardList } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Admin Panel</Link>
      <div className="flex items-center space-x-4">
        {user?.role !== "manager" && (
          <Link to="/users" className="hover:text-gray-200"><FaUsers /> Users</Link>
        )}
        {user && (
          <>
            <Link to="/clients" className="hover:text-gray-200"><FaClipboardList /> Clients</Link>
            <Link to="/logs" className="hover:text-gray-200"><FaClipboardList /> Logs</Link>
            <div className="relative group">
              <FaUserCircle className="text-2xl cursor-pointer" />
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded hidden group-hover:block">
                <div className="p-2">{user?.email}</div>
                {user?.role !== "manager" && (
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">Register User</Link>
                )}
                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
