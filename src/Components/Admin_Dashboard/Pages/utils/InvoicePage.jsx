import { motion, AnimatePresence } from 'framer-motion';
import {
  formatAccountNumber,
  formatIBAN,
  isOnlyLetters,
} from './formatAccount';

export function InvoicePage({
  invoiceData,
  accountsNumber,
  sendInvoices,
  clearForm,
  loading,
  complete,
}) {
  const signatureUrl = import.meta.env.VITE_SIGNATURE_URL;
  const logoUrl = import.meta.env.VITE_LOGO_URL;

  return (
    <>
      <AnimatePresence>
        {invoiceData && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              id="invoice-preview"
              className="relative min-h-[500px] rounded-lg border bg-white p-10 shadow-lg"
              style={{
                backgroundImage: `url(${logoUrl})`,
                backgroundSize: '250px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundBlendMode: 'lighten',
                opacity: 0.98,
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                <img src={logoUrl} alt="Codedynamo Logo" className="h-50" />
                <div className="text-right">
                  <h2 className="text-lg font-bold text-blue-600">Invoice</h2>
                  <p className="text-sm">Invoice No: {invoiceData.invoiceNo}</p>
                  <p className="text-sm">
                    Transaction ID: {invoiceData.transactionId}
                  </p>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="space-y-4 border-t pt-4 text-sm leading-6">
                {/* Invoice Details Table */}
                <table className="w-full border border-gray-300 text-left text-sm">
                  <tbody>
                    <tr>
                      <th className="w-1/3 border bg-gray-100 px-3 py-2">
                        Name
                      </th>
                      <td className="border px-3 py-2">{invoiceData.name}</td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">Services</th>
                      <td className="border px-3 py-2">
                        {invoiceData.services}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">Amount</th>
                      <td className="border px-3 py-2">
                        ${invoiceData.amount} USD
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">Date</th>
                      <td className="border px-3 py-2">{invoiceData.date}</td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">Due Date</th>
                      <td className="border px-3 py-2">
                        {invoiceData.dueDate}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">Status</th>
                      <td
                        className={`border px-3 py-2 font-bold ${
                          invoiceData.status === 'Paid'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {invoiceData.status}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Bank Details Table */}
                <h2 className="mt-6 text-lg font-bold">Bank Details</h2>
                <table className="w-full border border-gray-300 text-left text-sm">
                  <tbody>
                    <tr>
                      <th className="w-1/3 border bg-gray-100 px-3 py-2">
                        Bank Name
                      </th>
                      <td className="border px-3 py-2">
                        {' '}
                        {accountsNumber.bankName}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">
                        International Bank
                      </th>
                      <td className="border px-3 py-2">
                        {accountsNumber.bankName}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">
                        Account Title
                      </th>
                      <td className="border px-3 py-2">
                        {accountsNumber.accountTitle}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">
                        Account Number
                      </th>
                      <td className="border px-3 py-2">
                        {formatAccountNumber(accountsNumber.accountNumberAdmin)}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">IBAN</th>
                      <td className="border px-3 py-2">
                        {formatIBAN(accountsNumber.ibanNumber)}
                      </td>
                    </tr>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2">
                        SWIFT/BIC
                      </th>
                      <td className="border px-3 py-2">
                        {accountsNumber.swiftNumber}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Signature */}
                <div className="mt-8 flex items-center justify-between border-t pt-4">
                  <img
                    src={signatureUrl}
                    alt="Owner Signature"
                    className="h-40"
                  />
                  <p className="text-[10px]">
                    © 2025 Codedynamo — All Rights Reserved
                  </p>
                </div>
              </div>
            </div>{' '}
            {/* Send Button Outside */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                disabled={loading}
                onClick={sendInvoices}
                className={`${
                  loading
                    ? 'bg-gray-400'
                    : 'cursor-pointer bg-blue-600 hover:bg-blue-700 '
                } rounded px-6 py-2 text-white`}
              >
                {loading ? '📤 Sending...' : '📤 Send Invoice'}
              </button>

              <button
                onClick={clearForm}
                className="cursor-pointer rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
              >
                ❌ Cancel
              </button>
              <br />
              <span className="font-bold text-amber-600">{complete}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
