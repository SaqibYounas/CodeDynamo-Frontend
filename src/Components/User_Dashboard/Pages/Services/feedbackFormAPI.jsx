import { url } from './Port';

export async function saveFeedback({ serviceType, subject, message, stars }) {
  try {
    let response = await fetch(`${url}/user/feedback/save`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceType,
        subject,
        feedback: message,
        stars,
      }),
    });

    let data = await response.json();
    console.log(data);
    if (response.status === 201) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Feedback Submit Error:', error);
    return 'Network error occurred.';
  }
}

export async function getFeedback() {
  let url = import.meta.env.VITE_USER_URL;
  try {
    let response = await fetch(`${url}/user/feedback/get`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      return data.feedbacks;
    } else if (response.status === 400) {
      return data.message;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Password Change Error:', error);
    return 0;
  }
}
