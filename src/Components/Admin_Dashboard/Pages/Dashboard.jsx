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
    <div className="lex bg-gray-100 md:pl-80 lg:pl-64">
      {/* Right Side Content */}
      <div className="flex-1 space-y-6 p-6">
        <h2 className="text-2xl font-semibold">📊 Welcome, Admin!</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">👥 Total Users</h3>
            <p className="mt-2 text-3xl">120</p>
          </div>
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">📝 Service Requests</h3>
            <p className="mt-2 text-3xl">47</p>
          </div>
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">✅ Completed</h3>
            <p className="mt-2 text-3xl">39</p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="rounded bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">📌 Recent Users</h3>
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
        <div className="rounded bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">🛠️ Recent Requests</h3>
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
                      className={`rounded px-2 py-1 text-sm text-white ${
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
