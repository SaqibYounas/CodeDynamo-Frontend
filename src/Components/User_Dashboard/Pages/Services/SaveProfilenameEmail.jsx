import { url } from "./Port";

export async function saveProfiles() {
  const saveProfile = await fetch(`${url}/user/profile/datasave`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({}),
  });

  if (saveProfile.ok) {
    console.log("save data");
    return 1;
  } else {
    console.log("not save data");
  }
}
