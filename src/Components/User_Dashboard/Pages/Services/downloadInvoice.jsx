import { url } from './Port';

export const downloadInvoice = async (invoiceId) => {
  console.log(invoiceId);
  try {
    const response = await fetch(
      `${url}/user/download/user-invoice?invoiceID=${invoiceId}`, // ✅ id param case bhi match kare
      { method: 'GET', credentials: 'include' }
    );

    if (!response.ok) throw new Error('Failed to download');

    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `${invoiceId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Memory clean
    window.URL.revokeObjectURL(fileUrl);
  } catch (err) {
    console.error('Error downloading invoice:', err);
  }
};
