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
    <div className="rounded bg-white p-6 shadow md:pl-80 lg:pl-64">
      <h2 className="mb-4 text-2xl font-bold">👥 Manage Users</h2>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <ManageUsersSkeleton rows={usersData?.length || 6} />
        ) : (
          <table className="w-full min-w-[800px] border text-left">
            <thead>
              <tr className="border-b bg-gray-100">
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
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {user.isDeleted ? 'delete' : 'Active'}
                    </span>
                  </td>
                  <td className="space-x-2 p-2">
                    <button
                      onClick={() => handleBlock(user.id)}
                      className="rounded bg-yellow-400 px-3 py-1 text-sm text-white"
                    >
                      {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white"
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
