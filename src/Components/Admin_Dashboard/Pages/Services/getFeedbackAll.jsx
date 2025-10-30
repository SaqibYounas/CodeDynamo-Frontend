import { url } from './Port';
export async function getFeedbackAll(page) {
  try {
    let response = await fetch(
      `${url}/admin/feedback/get?page=${page}&limit=10`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    let data = await response.json();
    console.log(data);
    if (response.ok) {
      return data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log('getprofileid', error);
    return 0;
  }
}
