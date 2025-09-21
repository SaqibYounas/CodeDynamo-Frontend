import { url } from "./Port";

export async function getProfileData() {
  try {
    let response = await fetch(`${url}/user/profile/getdata`, {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
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
