// pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';

function AdminDashboard() {
  // Dummy data
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Dummy data simulation
    setUsers([
      { id: 1, name: 'Ali Raza', email: 'ali@example.com' },
      { id: 2, name: 'Fatima Khan', email: 'fatima@example.com' },
      { id: 3, name: 'Usman Ahmed', email: 'usman@example.com' },
    ]);

    setRequests([
      {
        id: 1,
        user: 'Ali Raza',
        service: 'Web Development',
        status: 'Pending',
      },
      { id: 2, user: 'Fatima Khan', service: 'SEO Audit', status: 'Completed' },
    ]);
  }, []);

  return (
    <div className=" lg:pl-64 md:pl-80 lex  bg-gray-100">
      {/* Right Side Content */}
      <div className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-semibold">📊 Welcome, Admin!</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold">👥 Total Users</h3>
            <p className="text-3xl mt-2">120</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold">📝 Service Requests</h3>
            <p className="text-3xl mt-2">47</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold">✅ Completed</h3>
            <p className="text-3xl mt-2">39</p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">📌 Recent Users</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Requests */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">🛠️ Recent Requests</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">User</th>
                <th className="py-2">Service</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2">{r.user}</td>
                  <td className="py-2">{r.service}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        r.status === 'Completed'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
