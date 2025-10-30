import { useState, useEffect } from 'react';
import { useNotifications } from '../context/context';
import { formatOnlyDate } from './utils/formatDate';
import ManageUsersSkeleton from '../skeletons/ManageUsers';
import { Pagination } from '../hooks/Pagination';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const { getUsersData, usersData } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUserDataAll();
  }, [page]);

  async function getUserDataAll() {
    try {
      setLoading(true);
      const res = await getUsersData(page);
      if (res && !isNaN(res)) {
        setTotalPages(res);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackData([]);
    } finally {
      setLoading(false);
    }
  }

  const handleBlock = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' }
          : u
      )
    );
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="lg:pl-64 md:pl-80 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">👥 Manage Users</h2>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <ManageUsersSkeleton rows={usersData?.length || 6} />
        ) : (
          <table className="w-full text-left border min-w-[800px]">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">WhatsApp</th>
                <th className="p-2">Country</th>
                <th className="p-2">Register</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{user.profileIdShort}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.phone || 'N/A'}</td>
                  <td className="p-2">{user.country || 'N/A'}</td>
                  <td className="p-2">{formatOnlyDate(user.createdAt)}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {user.isDeleted ? 'delete' : 'Active'}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleBlock(user.id)}
                      className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
                    >
                      {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default ManageUsers;
