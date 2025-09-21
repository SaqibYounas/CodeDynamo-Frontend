// src/utils/validation.js

// ✅ Validate Bank Name
export const validateBankName = (bankName) => {
  if (!bankName || bankName.trim() === "") {
    return "Bank name is required.";
  }
  if (bankName.length < 3) {
    return "Bank name must be at least 3 characters.";
  }
  return "";
};

// ✅ Validate Account Number
export const validateAccountNumber = (accountNumber) => {
  if (!accountNumber) {
    return "Account number is required.";
  }
  if (!/^\d{10,20}$/.test(accountNumber)) {
    return "Account number must be 10–20 digits.";
  }
  return "";
};

// ✅ Validate IBAN
export const validateIBAN = (iban) => {
  if (!iban) {
    return "IBAN number is required.";
  }
  if (!/^([A-Z]{2}[0-9]{2}[A-Z0-9]{1,30})$/.test(iban)) {
    return "Invalid IBAN format (e.g., PK46HABB6380479872082714).";
  }
  return "";
};

// ✅ Validate Amount
export const validateAmount = (amount) => {
  if (!amount) {
    return "Amount is required.";
  }
  if (isNaN(amount) || Number(amount) <= 0) {
    return "Enter a valid positive number in USD.";
  }
  return "";
};

// ✅ Validate Due Date
export const validateDueDate = (dueDate) => {
  if (!dueDate) {
    return "Due date is required.";
  }
  const today = new Date().setHours(0, 0, 0, 0);
  const selected = new Date(dueDate).setHours(0, 0, 0, 0);

  if (selected < today) {
    return "Due date cannot be in the past.";
  }
  return "";
};

// Swift/BIC Validator
export const validateSwift = (swift) => {
  if (!swift) {
    return "SWIFT/BIC code is required.";
  }

  // SWIFT/BIC must be 8 or 11 characters
  const swiftRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

  if (!swiftRegex.test(swift.trim().toUpperCase())) {
    return "Invalid SWIFT/BIC format (e.g., SCBLPKKX or SCBLPKKXXXX).";
  }

  return ""; // valid
};

