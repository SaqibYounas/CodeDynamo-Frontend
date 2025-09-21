import { url } from "./Port";
export async function getMessagesAll(page) {
  try {
    let response = await fetch(
      `${url}/admin/messages/user/chat?page=1&limit=10`,
      {
        method: "GET",
        credentials: "include",
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
    console.log("getprofileid", error);
    return 0;
  }
}
