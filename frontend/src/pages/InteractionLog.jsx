import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";

const InteractionLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("/logs")
      .then((res) => {
        console.log(res.data); // Log the response data to check its structure
        setLogs(res.data);
      })
      .catch(() => alert("Failed to fetch logs"));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Interaction Logs</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Client</th>
            <th className="p-2">Action</th>
            <th className="p-2">User</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t">
              <td className="p-2">{log.clientId?.name || "N/A"}</td>
              <td className="p-2">{log.action}</td>
              <td className="p-2">{log.performedBy?.email || "N/A"}</td>
              <td className="p-2">
                {new Date(log.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractionLog;
