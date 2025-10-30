// Account number ko 4 digits ke groups me format kare
export const formatAccountNumber = (num) => {
  if (!num) return '';
  return num
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

// IBAN ko 4 characters ke groups me format kare
export const formatIBAN = (iban) => {
  if (!iban) return '';
  return iban
    .replace(/\s?/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

export const isOnlyLetters = (str) => /^[A-Za-z\s]+$/.test(str);
