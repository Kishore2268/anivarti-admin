import { useState } from "react";
import axios from "../utils/AxiosInstance";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "manager" });

  if (!user || (user.role !== "superadmin" && user.role !== "admin")) {
    return <h2 className="text-center mt-10">Unauthorized</h2>;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", form);
      alert("User registered!");
    } catch (err) {
      alert("Error registering user!");
    }
  };

  return (
    <div className="p-10">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Register User</h2>
        <input type="text" placeholder="Name" className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <button className="w-full bg-blue-600 text-white py-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
