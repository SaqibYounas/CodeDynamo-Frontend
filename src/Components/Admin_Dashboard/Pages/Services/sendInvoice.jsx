import { url } from './Port';

export async function sendInvoice(data) {
  try {
    console.log('Sending invoice data:', data);

    const res = await fetch(`${url}/admin/user/send/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return 1;
    } else {
      const errData = await res.json();
      console.error('Backend error:', errData);
      return 0;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return 0;
  }
}
