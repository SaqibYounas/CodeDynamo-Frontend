import { url } from "./Port";

const FormApi = async (formData) => {
  try {
   const response = await fetch(`${url}/user/service-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.status===201){
    return 1;
  }
    return 0;
  } catch (error) {
    console.error("Form API Error:", error.message);
    return null;
  }
};

export default FormApi;
