import React, { useState, useRef, useEffect } from "react";
import { saveProfile } from "./Services/ProfilesaveAPI";
import { getProfileData } from "./Services/profilegetAPI";
import { useLoader } from "../context/Loaders";
export default function MyProfile() {
  const [editMode, setEditMode] = useState(false);
  const [pending, setPending] = useState(false);
  const { showLoader,hideLoader  } = useLoader();
  const [errors, setErrors] = useState({
    phone: "",
    city: "",
    country: "",
    responseAPI: "",
  });

  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    showLoader();
    const callAPI = await getProfileData();
    console.log(callAPI);
    if (callAPI) {
      const { name, email, phone, city, country } = callAPI.data;
      nameRef.current.value = name || "";
      emailRef.current.value = email || "";
      phoneRef.current.value = phone || "";
      cityRef.current.value = city || "";
      countryRef.current.value = country || "";
      hideLoader();
    } else {
      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      cityRef.current.value = "";
      countryRef.current.value = "";
      hideLoader();
    }
  };

  const validateForm = () => {
    const phone = phoneRef.current?.value.trim() || "";
    const city = cityRef.current?.value.trim() || "";
    const country = countryRef.current?.value.trim() || "";

    let valid = true;
    let newErrors = { phone: "", city: "", country: "", responseAPI: "" };

    if (!phone) {
      newErrors.phone = "Phone is required.";
      valid = false;
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Phone must be digits only.";
      valid = false;
    }

    if (!city) {
      newErrors.city = "City is required.";
      valid = false;
    } else if (!/^[A-Za-z ]+$/.test(city)) {
      newErrors.city = "Only characters allowed.";
      valid = false;
    }

    if (!country) {
      newErrors.country = "Country is required.";
      valid = false;
    } else if (!/^[A-Za-z ]+$/.test(country)) {
      newErrors.country = "Only characters allowed.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    setPending(true);
    setEditMode(false);

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      city: cityRef.current.value,
      country: countryRef.current.value,
    };

    const callAPISaveProfile = await saveProfile(payload);
    if (!callAPISaveProfile) {
      setErrors((prev) => ({
        ...prev,
        responseAPI: "Server Error! Try Again",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        responseAPI: "Profile updated successfully!",
      }));
    }

    setPending(false);
  };

  return (
    <div className="lg:pl-64 md:pl-80 flex items-center justify-center p-6 min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              ref={nameRef}
              disabled
              className="w-full border px-3 py-2 rounded mt-1 bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              ref={emailRef}
              disabled
              className="w-full border px-3 py-2 rounded mt-1 bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              ref={phoneRef}
              disabled={!editMode}
              placeholder="Add phone number"
              className={`w-full border px-3 py-2 rounded mt-1 ${
                editMode ? "" : "bg-gray-100"
              }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              ref={cityRef}
              disabled={!editMode}
              placeholder="Add your city"
              className={`w-full border px-3 py-2 rounded mt-1 ${
                editMode ? "" : "bg-gray-100"
              }`}
            />
            {errors.city && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.city}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              ref={countryRef}
              disabled={!editMode}
              placeholder="Add your country"
              className={`w-full border px-3 py-2 rounded mt-1 ${
                editMode ? "" : "bg-gray-100"
              }`}
            />
            {errors.country && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.country}
              </p>
            )}
          </div>
        </div>

        {/* Response message */}
        {errors.responseAPI && (
          <p className="mt-4 text-blue-600 font-semibold">
            {errors.responseAPI}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {!editMode ? (
            <button
              onClick={handleEdit}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              Edit
            </button>
          ) : (
            <button
              disabled={pending}
              onClick={handleUpdate}
              className={`px-4 py-2 rounded text-white cursor-pointer ${
                pending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {pending ? "Updating..." : "Update Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
