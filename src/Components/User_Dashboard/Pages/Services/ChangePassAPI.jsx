import { url } from "./Port";

export async function changePassAPI({ current, newPass }) {
  try {
    let response = await fetch(`${url}/user/change-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password: current,
        newPassword: newPass,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      return data.message;
    } else if (response.status === 400) {
      return data.message;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Password Change Error:", error);
    return 0;
  }
}
