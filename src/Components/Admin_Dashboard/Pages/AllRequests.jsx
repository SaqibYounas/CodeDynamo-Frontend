import React, { useState, useEffect } from "react";
import { useNotifications } from "../context/context";
import { formatDate } from "./utils/formatDate";
import { FaWhatsapp, FaRegCopy } from "react-icons/fa";
import { handleCopy, handleShare } from "./utils/createMessage";
import ManageUsersSkeleton from "../skeletons/ManageUsers"; // Reuse skeleton if similar
import { Pagination } from "../hooks/Pagination";
import { updateServicesByAdmin } from "./Services/updateServicebyAdmin";
function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
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
      if (res === "Status updated successfully") {
        console.log(res);
      } else {
        console.error("DB update failed");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Completed":
        return "bg-yellow-200 text-yellow-800";
      case "read":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const openModal = (description) => {
    setSelectedDescription(description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDescription("");
  };

  return (
    <div className="lg:pl-64 md:pl-80 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📋 All Service Requests</h2>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <ManageUsersSkeleton rows={services?.length || 6} />
        ) : (
          <table className="w-full min-w-[900px] text-left border">
            <thead>
              <tr className="bg-gray-100 border-b">
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
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2">{req.requestID}</td>
                    <td className="p-2">{req.name}</td>
                    <td className="p-2">{req.service}</td>
                    <td className="p-2">{req.whatsapp}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openModal(req.description)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Project Details
                      </button>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-2">{formatDate(req.createdAt)}</td>
                    <td className="p-2 space-y-1">
                      <div className="flex flex-wrap items-center gap-1 mb-1 cursor-pointer">
                        <button
                         disabled={req.status == "Approved"}
                          onClick={() =>
                            updateStatus(req.requestID, "Approved")
                          }
                          className="px-2 py-1 text-xs bg-green-500 hover:bg-green-700 text-white rounded cursor-pointer"
                         
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(req.requestID, "Rejected")
                          }
                          className="px-2 py-1 text-xs bg-red-500 hover:bg-red-700 text-white rounded cursor-pointer "
                          disabled={req.status === "Rejected"}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(req.requestID, "Completed")
                          }
                          className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-700 text-white rounded cursor-pointer"
                          disabled={
                            req.status === "Completed"
                          }
                        >
                          Completed
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare(req)}
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          title="Share on WhatsApp"
                        >
                          <FaWhatsapp size={20} />
                        </button>
                        <button
                          onClick={() => handleCopy(req)}
                          className="text-gray-700 hover:text-black cursor-pointer"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">Project Description</h3>
            <div className="text-gray-700 max-h-60 overflow-y-auto whitespace-pre-line">
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
