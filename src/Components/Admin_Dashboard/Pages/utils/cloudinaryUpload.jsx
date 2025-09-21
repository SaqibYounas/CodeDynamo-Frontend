// import axios from "axios";


// export const uploadImageToCloudinary = async (file) => {
//   if (!file) return null;
// console.log(file)
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "codedynamo"); // ✅ Unsigned preset ka naam

//   try {
//     const res = await axios.post(
//       "https://api.cloudinary.com/v1_1/detbhod58/image/upload",
//       data
//     );
//     console.log(res.data.secure_url)
//     return res.data.secure_url; // ✅ Cloudinary image ka URL
//   } catch (err) {
//     console.error("Cloudinary Unpmpload Error:", err.response?.data || err.message);
//     return null;
//   }
// };

