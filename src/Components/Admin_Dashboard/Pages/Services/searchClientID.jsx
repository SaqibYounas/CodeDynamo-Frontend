import { url } from './Port';

export async function searchClientID(ID) {
  try {
    console.log(ID);
    let res = await fetch(`${url}/admin/user/search/clientid?clinetID=${ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    let data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
}
