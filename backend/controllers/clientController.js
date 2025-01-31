const Client = require("../models/Client");
const Log = require("../models/Log");

// Create a new client
exports.createClient = async (req, res) => {
    try {
        const { name, email, company, phone, address } = req.body;
        const createdBy = req.user.id;

        const newClient = new Client({ name, email, company, phone, address, createdBy });
        await newClient.save();

        res.status(201).json({ message: "Client added successfully", client: newClient });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

//update client
exports.updateClient = async (req, res) => {
    try {
      const { name, email, company, phone, address } = req.body;
      const updatedBy = req.user.id;
  
      const updatedClient = await Client.findByIdAndUpdate(
        req.params.id,
        { name, email, company, phone, address, updatedBy },
        { new: true }
      );
  
      if (!updatedClient) return res.status(404).json({ message: "Client not found" });
  
      // Log the update action
      await Log.create({ clientId: updatedClient._id, action: "edit", performedBy: updatedBy });
  
      res.status(200).json({ message: "Client updated successfully", client: updatedClient });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };
  

// Delete client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });

        const deletedBy = req.user.id;
        await client.deleteOne();

        // Log the delete action
        await Log.create({ clientId: client._id, action: "delete", performedBy: deletedBy });

        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
