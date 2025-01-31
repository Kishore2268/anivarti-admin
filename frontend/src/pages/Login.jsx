import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/clients");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border mb-2"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-4"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
