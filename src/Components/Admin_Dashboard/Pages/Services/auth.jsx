import { url } from "./Port";
export async function isAuthenticated() {

  let response = await fetch(`${url}/admin/protected`, {
    method: "GET",
    credentials: "include",
  });
  if (response.status === 401) {
    return 0;
  } else if (response.status === 200) {
    return 1;
  }
}
