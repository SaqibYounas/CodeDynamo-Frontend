import React, { useEffect, useState } from "react";
import { FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getInvoicesData } from "./Services/getInvoicesData";
import { Pagination } from "../hooks/Pagination";
import InvoicesSkelton from "../skeletons/Invoices";
import { downloadInvoice } from "./Services/downloadInvoice";

function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [downloadId, setDownloadId] = useState(null);

  useEffect(() => {
    getInvoices();
  }, [page]);

  async function getInvoices() {
    try {
      setLoading(true);
      let data = await getInvoicesData(page);
      if (data && data.Invoices && Array.isArray(data.Invoices)) {
        setInvoices(data.Invoices);
        setTotalPages(data.totalPages || 1);
      } else {
        setInvoices([]);
      }
    } catch (err) {
      console.error(err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }

  const downloadInvoices = async (name, requestID, invoiceID) => {
    try {
      setDownloadId(invoiceID);
      let InvoiceIDs = `${name}_${requestID}_${invoiceID}`;
      await downloadInvoice(InvoiceIDs);
    } catch (error) {
      console.log("Download error", error);
    } finally {
      setDownloadId(null);
    }
  };

  return (
    <div className="p-6 lg:pl-64 md:pl-80 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🧾 Users Invoices
      </h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Invoice #</th>
              <th className="py-3 px-4 border-b">Request ID</th>
              <th className="py-3 px-4 border-b">Client</th>
              <th className="py-3 px-4 border-b">Service</th>
              <th className="py-3 px-4 border-b">Amount ($)</th>
              <th className="py-3 px-4 border-b">Generated Date</th>
              <th className="py-3 px-4 border-b">Due Date</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <InvoicesSkelton count={invoices.length || 6} />
            ) : invoices.length > 0 ? (
              invoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">#{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 border-b">{inv.requestID}</td>
                  <td className="py-3 px-4 border-b">{inv.clientName}</td>
                  <td className="py-3 px-4 border-b">{inv.serviceName}</td>
                  <td className="py-3 px-4 border-b">
                    {parseFloat(inv.amount).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 border-b">{inv.generateDate}</td>
                  <td className="py-3 px-4 border-b">{inv.dueDate}</td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-white flex items-center gap-1 ${
                        inv.status.toLowerCase() === "paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {inv.status.toLowerCase() === "paid" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimesCircle />
                      )}
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 px-3 border-b">
                    <button
                      disabled={downloadId === inv.invoiceNumber}
                      title="Download PDF"
                      className={`h-9 px-4 rounded flex items-center justify-center gap-2 text-white text-sm ${
                        downloadId === inv.invoiceNumber
                          ? "bg-stone-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      }`}
                      onClick={() =>
                        downloadInvoices(
                          inv.clientName,
                          inv.requestID,
                          inv.invoiceNumber
                        )
                      }
                    >
                      <FaDownload className="text-base" />
                      {downloadId === inv.invoiceNumber
                        ? "Downloading"
                        : "PDF"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default MyInvoices;
