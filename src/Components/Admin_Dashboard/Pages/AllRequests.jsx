import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/context';
import { formatDate } from './utils/formatDate';
import { FaWhatsapp, FaRegCopy } from 'react-icons/fa';
import { handleCopy, handleShare } from './utils/createMessage';
import ManageUsersSkeleton from '../skeletons/ManageUsers'; // Reuse skeleton if similar
import { Pagination } from '../hooks/Pagination';
import { updateServicesByAdmin } from './Services/updateServicebyAdmin';
function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const { services, getUserServicesStatus } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllServerices();
  }, [page]);

  async function getAllServerices() {
    setLoading(true);
    const pages = await getUserServicesStatus(page);
    setTotalPages(pages);
    setLoading(false);
  }
  useEffect(() => {
    if (services.length > 0) {
      setRequests(services); // ✅ yahan updated services milengi
    }
  }, [services]);

  const updateStatus = async (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.requestID === id ? { ...req, status: newStatus } : req
      )
    );
    try {
      const res = await updateServicesByAdmin(id, newStatus, page);
      if (res === 'Status updated successfully') {
        console.log(res);
      } else {
        console.error('DB update failed');
      }
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-200 text-green-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      case 'Completed':
        return 'bg-yellow-200 text-yellow-800';
      case 'read':
        return 'bg-blue-200 text-blue-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const openModal = (description) => {
    setSelectedDescription(description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDescription('');
  };

  return (
    <div className="rounded bg-white p-6 shadow md:pl-80 lg:pl-64">
      <h2 className="mb-4 text-2xl font-bold">📋 All Service Requests</h2>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <ManageUsersSkeleton rows={services?.length || 6} />
        ) : (
          <table className="w-full min-w-[900px] border text-left">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Title</th>
                <th className="p-2">Whatsapp</th>
                <th className="p-2">Description</th>
                <th className="p-2">Status</th>
                <th className="p-2">Time</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((req, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b transition hover:bg-gray-50"
                  >
                    <td className="p-2">{req.requestID}</td>
                    <td className="p-2">{req.name}</td>
                    <td className="p-2">{req.service}</td>
                    <td className="p-2">{req.whatsapp}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openModal(req.description)}
                        className="cursor-pointer text-blue-600 hover:underline"
                      >
                        Project Details
                      </button>
                    </td>
                    <td className="p-2">
                      <span
                        className={`rounded px-2 py-1 text-xs font-semibold ${getStatusClass(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-2">{formatDate(req.createdAt)}</td>
                    <td className="space-y-1 p-2">
                      <div className="mb-1 flex cursor-pointer flex-wrap items-center gap-1">
                        <button
                          disabled={req.status == 'Approved'}
                          onClick={() =>
                            updateStatus(req.requestID, 'Approved')
                          }
                          className="cursor-pointer rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(req.requestID, 'Rejected')
                          }
                          className="cursor-pointer rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-700"
                          disabled={req.status === 'Rejected'}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(req.requestID, 'Completed')
                          }
                          className="cursor-pointer rounded bg-yellow-500 px-2 py-1 text-xs text-white hover:bg-yellow-700"
                          disabled={req.status === 'Completed'}
                        >
                          Completed
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare(req)}
                          className="cursor-pointer text-green-600 hover:text-green-800"
                          title="Share on WhatsApp"
                        >
                          <FaWhatsapp size={20} />
                        </button>
                        <button
                          onClick={() => handleCopy(req)}
                          className="cursor-pointer text-gray-700 hover:text-black"
                          title="Copy to Clipboard"
                        >
                          <FaRegCopy size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <button
              className="absolute top-2 right-3 cursor-pointer text-lg text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="mb-4 text-xl font-semibold">Project Description</h3>
            <div className="max-h-60 overflow-y-auto whitespace-pre-line text-gray-700">
              {selectedDescription}
            </div>
          </div>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default AllRequests;
