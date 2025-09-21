// utils/logoutUser.js
import { url } from "./Port";
export async function logoutadmin() {
  try {
    const response = await fetch(`${url}/admin/logout`, {
      method: "GET",
      credentials: "include",
    });

    return response.status === 200;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
