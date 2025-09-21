import { url } from "./Port";

export async function saveProfile({ phone, city, country }) {

  try {
    let response = await fetch(`${url}/admin/profile/datasave`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        city: city,
        country: country,
      }),
    });
    let data = await response.json();
    if (response.ok) {
      return data.message;
    } else {
      return data.message;
    }
  } catch (error) {
    console.log("profile save error", error);
    return 0;
  }
}
