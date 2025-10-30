import React, { useEffect, useState } from 'react';
import { FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { getInvoicesData } from './Services/getInvoicesData';
import InvoicesSkelton from '../skeletons/Invoices';
import { downloadInvoice } from './Services/downloadInvoice';
import { useNotifications } from '../context/context';
function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadId, setDownloadId] = useState(null);
  const { invoice } = useNotifications();
  useEffect(
    () => {
      getInvoices();
    },
    [],
    [invoice]
  );

  async function getInvoices() {
    try {
      setLoading(true);
      let data = await getInvoicesData();
      if (data && data.invoices && Array.isArray(data.invoices)) {
        setInvoices(data.invoices);
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
      console.log('Download error', error);
    } finally {
      setDownloadId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:pl-80 lg:pl-64">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">🧾 My Invoices</h1>

      <div className="overflow-x-auto rounded bg-white shadow sm:text-sm">
        <table className="min-w-full border text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border-b px-4 py-3">Invoice #</th>
              <th className="border-b px-4 py-3">Client</th>
              <th className="border-b px-4 py-3">Service</th>
              <th className="border-b px-4 py-3">Amount ($)</th>
              <th className="border-b px-4 py-3">Generated Date</th>
              <th className="border-b px-4 py-3">Due Date</th>
              <th className="border-b px-4 py-3">Status</th>
              <th className="border-b px-4 py-3">PDF</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <InvoicesSkelton count={invoices.length || 6} />
            ) : invoices.length > 0 ? (
              invoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-3">#{inv.invoiceNumber}</td>
                  <td className="border-b px-4 py-3">{inv.clientName}</td>
                  <td className="border-b px-4 py-3">{inv.serviceName}</td>
                  <td className="border-b px-4 py-3">
                    {parseFloat(inv.amount).toFixed(2)}
                  </td>
                  <td className="border-b px-4 py-3">{inv.generateDate}</td>
                  <td className="border-b px-4 py-3">{inv.dueDate}</td>
                  <td className="border-b px-4 py-3">
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-1 text-white ${
                        inv.status.toLowerCase() === 'paid'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {inv.status.toLowerCase() === 'paid' ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimesCircle />
                      )}
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </td>
                  <td className="border-b px-3 py-2">
                    <button
                      disabled={downloadId === inv.invoiceNumber}
                      title="Download PDF"
                      className={`flex h-8 items-center justify-center gap-2 rounded px-2 text-sm text-white ${
                        downloadId === inv.invoiceNumber
                          ? 'cursor-not-allowed bg-stone-600'
                          : 'cursor-pointer bg-blue-600 hover:bg-blue-700'
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
                      {downloadId === inv.invoiceNumber ? 'Downloading' : 'PDF'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyInvoices;
