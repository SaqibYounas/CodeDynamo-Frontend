// src/components/InvoiceGenerator.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { sendInvoice } from "./Services/sendInvoice";
import { searchClientID } from "./Services/searchClientID";
import { InvoicePage } from "./utils/InvoicePage";
import Loader from "../layouts/Loader";
import { v4 as uuidv4 } from "uuid";

import {
  formatAccountNumber,
  formatIBAN,
  isOnlyLetters,
} from "./utils/formatAccount";
import { Loader2 } from "lucide-react";
import { onlyDateFormatToday, onlyDueFormatToday } from "./utils/formatDate";
import {
  validateBankName,
  validateAccountNumber,
  validateIBAN,
  validateAmount,
  validateDueDate,
  validateSwift,
} from "./utils/inputValidationInvocie";
// import { uploadImageToCloudinary } from "./utils/cloudinaryUpload";

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    id: "",
    name: "",
    services: [],
    amount: "",
    dueDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState("");

  const debounceRef = useRef(null);

  // state
  const [accountsNumber, setAccountsNumber] = useState({
    bankName: "Standard Chartered",
    accountTitle: "Codedynamo Pvt Ltd", // fix typo
    accountNumberAdmin: "269848688509722",
    ibanNumber: "PK46HABB6380479872082714",
    bankNameOther: "",
    swiftNumber: "SCBLPKKX",
  });

  const signatureUrl = import.meta.env.VITE_SIGNATURE_URL;
  const logoUrl = import.meta.env.VITE_LOGO_URL;

  const handleSearch = async (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
    setErrors({});

    // Reset form safely
    setForm({
      id: "",
      name: "",
      services: "",
      amount: "",
      dueDate: "",
    });
    setSelectedClient(null);
    // Debounce clear
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value) {
        setFilteredClients([]);
        return;
      }
      try {
        const searchResult = await searchClientID(value);

        if (searchResult && searchResult.length > 0) {
          setFilteredClients(
            Array.isArray(searchResult) ? searchResult : [searchResult]
          );
        } else {
          setErrors({
            searchError: "No Client found. Enter a correct Client ID.",
          });
          setFilteredClients([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setErrors({
          searchError: "Something went wrong while searching client.",
        });
        setFilteredClients([]);
      }
    }, 300);
  };

  const BackPage = () => {
    setInvoiceData("");
  };

  // 🎯 Select Client
  const selectClient = (client) => {
    setSelectedClient([client]);
    setErrors({});

    setForm({
      ...form,
      id: client.requestID,
      name: client.name,
      services: client.service,
    });
    setSearchTerm(client.requestID);
    setFilteredClients([]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧾 Generate Invoice
  const generateInvoice = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};
    newErrors.bankName = isOnlyLetters(accountsNumber.bankName)
      ? ""
      : "Only letters allowed";
    newErrors.accountNumberAdmin = validateAccountNumber(
      accountsNumber.accountNumberAdmin
    );
    newErrors.swiftNumber = validateSwift(accountsNumber.swiftNumber);
    newErrors.ibanNumber = validateIBAN(accountsNumber.ibanNumber);
    newErrors.amount = validateAmount(form.amount);
    newErrors.dueDate = validateDueDate(form.dueDate);
    newErrors.accountTitle = isOnlyLetters(accountsNumber.accountTitle)
      ? ""
      : "Only letters allowed";

    if (Object.values(newErrors).some((err) => err !== "")) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const currnetDate = onlyDateFormatToday();
    const dueDate = onlyDueFormatToday(form.dueDate);
    const now = new Date();
    const transactionId = `TXN-${uuidv4().slice(0, 12)}`;
    const invoiceNo = `CD-INV-${now.getFullYear()}-${uuidv4().slice(0, 8)}`;


    setInvoiceData({
      invoiceNo,
      transactionId,
      requestID: form.id,
      date: currnetDate,
      dueDate: dueDate,
      name: form.name,
      services: form.services,
      amount: parseFloat(form.amount).toFixed(2),
      status: "Pending Payment",
    });
  };

  // 📤 Send Invoice
  const sendInvoices = async () => {
    setComplete("");
    let data = {
      invoiceData,
      accountsNumber,
      logoUrl,
      signatureUrl,
    };

    setComplete(
      "📤 Sending your invoice... Please wait and do not close this page."
    );
    setLoading(true);

    let sendInvoicesRes = await sendInvoice(data);

    if (sendInvoicesRes) {
      setComplete("✅ Your invoice has been sent successfully! Redirecting...");
      setLoading(false);
    } else {
      setComplete("❌ Unable to send invoice. Please try again later.");
      setLoading(false);
    }
  };

  // ♻ Reset everything
  const clearForm = () => {
    setInvoiceData(null);
    setForm({ id: "", name: "", services: [], amount: "", dueDate: "" });
    setSelectedClient(null);
    setSearchTerm("");
  };

  const clearFormPending = () => {
    setForm({ id: "", name: "", services: [], amount: "", dueDate: "" });
    setSelectedClient(null);
    setSearchTerm("");
  };

  return (
    <div className="lg:pl-64 md:pl-80 p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      {loading && <Loader />}

      <h1 className="text-3xl font-bold mb-6 text-center">
        💼 Invoice Generator
      </h1>

      {/* Form */}
      {!invoiceData && (
        <motion.form
          onSubmit={generateInvoice}
          className="space-y-4 bg-white p-6 rounded shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search */}
          <div>
            <label className="block font-medium">Search Client by ID</label>
            <input
              value={searchTerm || ""}
              onChange={handleSearch}
              type="text"
              className="w-full border rounded p-2"
              placeholder="Type client ID..."
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-500" />
            )}
            {filteredClients.length > 0 ? (
              <ul className="border rounded mt-1 bg-white max-h-32 overflow-y-auto">
                {filteredClients.map((client, idx) => (
                  <li
                    key={idx}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => selectClient(client)}
                  >
                    {client.requestID} - {client.name} - {client.service}
                  </li>
                ))}
              </ul>
            ) : (
              errors.searchError && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.searchError}
                </p>
              )
            )}
          </div>

          {selectedClient && selectedClient.length > 0 && (
            <>
              <div>
                <label className="block font-medium">Client Name</label>
                <input
                  value={form.name}
                  type="text"
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-medium">Service</label>
                <input
                  value={form.services}
                  type="text"
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>

              {/* Bank Name Editable */}
              <div>
                <label className="block font-medium">Bank</label>
                <input
                  value={accountsNumber.bankName}
                  type="text"
                  onChange={(e) =>
                    setAccountsNumber({
                      ...accountsNumber,
                      bankName: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                />
                {errors.bankName && (
                  <p className="text-red-600 text-sm mt-1">{errors.bankName}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Account Title</label>
                <input
                  value={accountsNumber.accountTitle}
                  type="text"
                  onChange={(e) =>
                    setAccountsNumber({
                      ...accountsNumber,
                      accountTitle: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                />
                {errors.accountTitle && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.accountTitle}
                  </p>
                )}
              </div>

              {/* Account Number Editable */}
              <div>
                <label className="block font-medium">Account Number</label>
                <input
                  value={accountsNumber.accountNumberAdmin}
                  type="text"
                  onChange={(e) =>
                    setAccountsNumber({
                      ...accountsNumber,
                      accountNumberAdmin: formatAccountNumber(
                        e.target.value.replace(/\s/g, "")
                      ),
                    })
                  }
                  className="w-full border rounded p-2 font-mono tracking-wider"
                />

                <small className="text-gray-500">
                  {formatAccountNumber(accountsNumber.accountNumberAdmin)}
                </small>
                {errors.accountNumberAdmin && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.accountNumberAdmin}
                  </p>
                )}
              </div>

              {/* IBAN Editable */}
              <div>
                <label className="block font-medium">IBAN Number</label>
                <input
                  value={accountsNumber.ibanNumber}
                  type="text"
                  onChange={(e) =>
                    setAccountsNumber({
                      ...accountsNumber,
                      ibanNumber: formatIBAN(e.target.value.replace(/\s/g, "")),
                    })
                  }
                  className="w-full border rounded p-2 font-mono tracking-wider"
                />
                <small className="text-gray-500">
                  {formatIBAN(accountsNumber.ibanNumber)}
                </small>
                {errors.ibanNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.ibanNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium">Swift/IBAN Number</label>
                <input
                  name="swiftNumber"
                  onChange={(e) =>
                    setAccountsNumber({
                      ...accountsNumber,
                      swiftNumber: e.target.value,
                    })
                  }
                  value={accountsNumber.swiftNumber}
                  type="text"
                  className="w-full border rounded p-2 font-mono tracking-wider"
                />
                <small className="text-gray-500">
                  {accountsNumber.swiftNumber}
                </small>
                {errors.swiftNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.swiftNumber}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block font-medium">Amount ($ USD)</label>
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              type="number"
              step="0.01"
              className="w-full border rounded p-2"
              placeholder="e.g. 50.00"
              required
            />

            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Due Date</label>
            <input
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              type="date"
              className="w-full border rounded p-2"
              required
            />

            {errors.dueDate && (
              <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          <button
            title=" Generate Invoice"
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Generate Invoice
          </button>
          <button
            title="Cancel"
            onClick={clearFormPending}
            className="bg-red-600 text-white ml-10 px-8 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Clear
          </button>
        </motion.form>
      )}

      {invoiceData && (
        <InvoicePage
          invoiceData={invoiceData}
          accountsNumber={accountsNumber}
          sendInvoices={sendInvoices}
          clearForm={clearForm}
          loading={loading}
          complete={complete}
        />
      )}
    </div>
  );
}
