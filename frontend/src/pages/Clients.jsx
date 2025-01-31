import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    address: "",
  });
  const [editingClient, setEditingClient] = useState(null); // Track the client being edited
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get("/clients")
      .then((res) => setClients(res.data))
      .catch(() => alert("Failed to fetch clients"));
  }, []);

  const addClient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/clients/add", newClient);
      setClients([...clients, data]);
      setNewClient({
        name: "",
        email: "",
        company: "",
        phone: "",
        address: "",
      });
      setShowForm(false);
    } catch (error) {
      alert("Failed to add client");
    }
  };

  const deleteClient = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`/clients/${id}`);
    setClients(clients.filter(client => client._id !== id));
  };

  // Edit client handler
  const handleEdit = (client) => {
    setEditingClient(client); // Set the client to edit
    setNewClient(client); // Populate the form with current client data
    setShowForm(true); // Show the form
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/clients/${editingClient._id}`, newClient);
      setClients(clients.map(client => 
        client._id === editingClient._id ? data.client : client
      ));
      setNewClient({
        name: "",
        email: "",
        company: "",
        phone: "",
        address: "",
      });
      setEditingClient(null); // Reset the editing client
      setShowForm(false); // Hide the form
    } catch (error) {
      alert("Failed to update client");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 text-white px-4 py-2 mb-4"
      >
        {showForm ? (editingClient ? "Cancel Edit" : "Cancel") : "Add New Client"}
      </button>

      {/* Form to add or edit client */}
      {showForm && (
        <form onSubmit={editingClient ? handleUpdateClient : addClient} className="mb-4">
          <input
            type="text"
            placeholder="Client Name"
            className="p-2 border mr-2"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border mr-2"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            className="p-2 border mr-2"
            value={newClient.company}
            onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="p-2 border mr-2"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="p-2 border mr-2"
            value={newClient.address}
            onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2">
            {editingClient ? "Update Client" : "Add Client"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div key={client._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{client.name}</h3>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Company:</strong> {client.company}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => deleteClient(client._id)} className="text-red-500 mr-2">
                <FaTrash />
              </button>
              <button onClick={() => handleEdit(client)} className="text-green-500">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
