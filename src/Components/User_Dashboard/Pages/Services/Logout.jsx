// utils/logoutUser.js
import { url } from "./Port";

export async function logoutUser() {
  try {
    const response = await fetch(`${url}/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    return response.status === 200;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
