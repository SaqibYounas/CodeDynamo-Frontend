import {url} from "../Pages/Services/Port" 
export async function isAuthenticated() {
  let response = await fetch(`${url}/user/protected`, {
    method: "GET",
    credentials: "include",  
  });
  console.log(response.status)
  if (response.status === 401) {
    return 0;
  } else if (response.status === 200) {
    return 1;
  }
}
