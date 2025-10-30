// import { useRef, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
// import { url } from "./Port";
// import { ProfilerWrapper } from "../../utils/Profiler";
// function Signup() {
//   const navigate = useNavigate();
//   const handleLoginClick = () => {
//     navigate("/auth/login");
//   };

//   const nameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const [response, setResponse] = useState("");
//   const [pending, setPending] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const formKey = "signup-form";

//   const onsubmit = (e) => {
//     e.preventDefault();
//     writeData();
//   };

//   useEffect(() => {
//     const itemStr = localStorage.getItem(formKey);
//     if (!itemStr) return;

//     const item = JSON.parse(itemStr);
//     if (Date.now() > item.expiry) {
//       localStorage.removeItem(formKey);
//     } else {
//       if (nameRef.current) nameRef.current.value = item.value.name;
//       if (emailRef.current) emailRef.current.value = item.value.email;
//     }
//   }, []);

//   const handleBlur = () => {
//     const data = {
//       name: nameRef.current?.value || "",
//       email: emailRef.current?.value || "",
//     };
//     const withExpiry = {
//       value: data,
//       expiry: Date.now() + 900 * 1000,
//     };
//     localStorage.setItem(formKey, JSON.stringify(withExpiry));
//   };

//   // 🔍 Validation Function
//   const validateInputs = () => {
//     const name = nameRef.current.value.trim();
//     const email = emailRef.current.value.trim();
//     const password = passwordRef.current.value.trim();

//     let hasError = false;

//     // Reset errors first
//     setNameError("");
//     setEmailError("");
//     setPasswordError("");
//     setResponse("");

//     if (!name) {
//       setNameError("Enter a name.");
//       nameRef.current.focus();
//       hasError = true;
//     } else if (!name.match(/^[A-Za-z ]+$/)) {
//       setNameError("Name should contain only letters.");
//       nameRef.current.focus();
//       hasError = true;
//     }

//     if (!email) {
//       if (!hasError) emailRef.current.focus();
//       setEmailError("Please enter your email.");
//       hasError = true;
//     } else if (
//       !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
//     ) {
//       if (!hasError) emailRef.current.focus();
//       setEmailError("Invalid email format.");
//       hasError = true;
//     }

//     if (!password) {
//       if (!hasError) passwordRef.current.focus();
//       setPasswordError("Please enter your password.");
//       hasError = true;
//     } else if (!password.match(/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
//       if (!hasError) passwordRef.current.focus();
//       setPasswordError(
//         "Password must be at least 8 characters and contain a special character."
//       );
//       hasError = true;
//     }

//     if (hasError) return null;
//     return { name, email, password };
//   };
//   const writeData = async () => {
//     const formData = validateInputs();
//     if (!formData) return;

//     const { name, email, password } = formData;
//     setPending(true);
//     localStorage.setItem("email", email);

//     try {
//       const res = await fetch(`${url}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name, email, password }),
//       });
//       let data = await res.json();

//       if (res.status === 409) {
//         setEmailError(data.message || "Email already exists");
//       } else if (res.status === 500) {
//         navigate("/auth/server-error");
//       } else if (res.status === 400) {
//         if (
//           data.message === "Email not send this domain.Write corrected email"
//         ) {
//           setEmailError(
//             "Please use a valid email address. Email not sent to this domain"
//           );
//         } else {
//           setEmailError(data.message || "Invalid email domain");
//         }
//       } else if (res.status === 200) {
//         navigate("/auth/verify");
//       } else {
//         setResponse("Unknown response from server.");
//       }

//       localStorage.removeItem(formKey);
//     } catch (error) {
//       console.log("Fetch failed:", error.message);
//       setResponse("Network error! Please try again later.");
//     } finally {
//       setPending(false);
//     }
//   };

//   const redirect = () => {
//     localStorage.removeItem(formKey);
//     window.location.href = `${url}/auth/google`;
//   };

//   return (
//     <ProfilerWrapper id="Signup">
//     <>
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//           <div className="flex items-center justify-center mb-6 space-x-3">
//             <FaUserPlus title="icon" className="w-8 h-8  text-purple-600" />
//             <h2 className="text-2xl font-bold text-gray-800">
//               Create an Account
//             </h2>
//           </div>

//           <form onSubmit={onsubmit} className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block mb-1 text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 id="name"
//                 placeholder="abc"
//                 ref={nameRef}
//                 required
//                 onBlur={handleBlur}
//                 onChange={() => {
//                   setNameError("");
//                   setResponse("");
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {nameError && (
//                 <p className="text-red-600 text-sm mt font-semibold">
//                   {nameError}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-1 text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="example@email.com"
//                 ref={emailRef}
//                 onBlur={handleBlur}
//                 required
//                 onChange={() => {
//                   setEmailError("");
//                   setResponse("");
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {emailError && (
//                 <p className="text-red-600 text-sm mt-1 font-semibold">
//                   {emailError}
//                 </p>
//               )}
//               {(response === "Email already exists" ||
//                 response === "Invalid email domain") && (
//                 <p className="text-red-600 text-sm mt-1 font-semibold">
//                   {response}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block mb-1 text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="At least 8 characters, 1 special char"
//                   ref={passwordRef}
//                   required
//                   onBlur={handleBlur}
//                   onChange={() => {
//                     setPasswordError(""), setResponse("");
//                   }}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>

//                 {passwordError && (
//                   <p className="text-red-600 text-sm mt-1 font-semibold">
//                     {passwordError}
//                   </p>
//                 )}
//                 {response === "Password does not match" && (
//                   <p className="text-red-600 text-sm mt-1 font-semibold">
//                     {response}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               data-testid="signup"
//               disabled={pending}
//               className={`w-full py-2 rounded-lg transition duration-300  ${
//                 pending
//                   ? "bg-gray-400 cursor-progress"
//                   : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
//               }`}
//             >
//               {pending ? "Signing up..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-grow h-px bg-gray-300" />
//             <span className="px-3 text-gray-500 text-sm">or continue with</span>
//             <div className="flex-grow h-px bg-gray-300" />
//           </div>

//           {/* Google Signup */}
//           <button
//             onClick={redirect}
//             className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               className="h-5 w-5"
//             />
//             <span className="text-sm text-gray-700 group-hover:text-blue-700 transition cursor-pointer">
//               Signup with Google
//             </span>
//           </button>

//           <div className="flex justify-center mt-4">
//             <button
//               onClick={handleLoginClick}
//               className="  text-blue-600 font-medium hover:underline cursor-pointer"
//             >
//               Have you Account?Login
//             </button>
//           </div>
//           {response && (
//             <p
//               className={`mt-4 text-center text-sm font-medium ${
//                 response.toLowerCase().includes("successful")
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {response}
//             </p>
//           )}
//         </div>
//       </div>
//     </></ProfilerWrapper>
//   );
// }

// export default Signup;

// // const writeData = async () => {
// //   const name = nameRef.current.value.trim();
// //   const email = emailRef.current.value.trim();
// //   const password = passwordRef.current.value.trim();

// //   // Reset previous errors
// //   setNameError("");
// //   setEmailError("");
// //   setPasswordError("");
// //   setResponse("");

// //   let hasError = false;

// //   // Empty Fields
// //   if (name === "") {
// //     setNameError("Enter a name.");
// //     if (!hasError) nameRef.current.focus();
// //     hasError = true;
// //   } else if (!name.match(/^[A-Za-z ]+$/)) {
// //     setNameError("Name should contain only letters.");
// //     if (!hasError) nameRef.current.focus();
// //     hasError = true;
// //   }
// //   if (email === "") {
// //     setEmailError("Please enter your email.");
// //     if (!hasError) emailRef.current.focus(); // 👈 sirf pehla error field focus hoga
// //     hasError = true;
// //   } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
// //     setEmailError("Invalid email format.");
// //     if (!hasError) emailRef.current.focus(); // 👈 agar format ghalat hai to bhi pehle email pe focus
// //     hasError = true;
// //   }

// //   if (password === "") {
// //     setPasswordError("Please enter your password.");
// //     if (!hasError) passwordRef.current.focus();
// //     hasError = true;
// //   } else if (!password.match(/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
// //     setPasswordError(
// //       "Password must be at least 8 characters and contain a special character."
// //     );
// //     if (!hasError) passwordRef.current.focus();
// //     hasError = true;
// //   }

// //   // If there are validation errors, do not proceed
// //   if (hasError) return;

// //   // Start signup process
// //   setPending(true);
// //   localStorage.setItem("email", email);
// //   const formData = { name, email, password };

// //   try {
// //     const res = await fetch(`${url}/auth/signup`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       credentials: "include",
// //       body: JSON.stringify(formData),
// //     });

// //     const data = await res.json();
// //     console.log(data);
// //     if (res.status === 409) {
// //       setEmailError(data.message || "Email already exists");
// //     } else if (res.status === 500) {
// //       navigate("/auth/server-error");
// //     } else if (res.status === 400) {
// //       if (data.message === "Email not send this domain.Write corrected email") {
// //         setEmailError(
// //           " Please use a valid email address. Email Not sent to this domain"
// //         );
// //       } else {
// //         setEmailError(data.message || "Invalid email domain");
// //       }
// //     } else if (res.status === 200) {
// //       navigate("/auth/verify");
// //     } else {
// //       setResponse("Unknown response from server.");
// //     }
// //     localStorage.removeItem(formKey);
// //   } catch (error) {
// //     console.log("Fetch failed:", error.message);
// //     setResponse("Network error! Please try again later.");
// //   } finally {
// //     setPending(false);
// //   }
// // };

'use client';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { url } from './Port';
import { ProfilerWrapper } from '../../utils/Profiler';

function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [response, setResponse] = useState('');
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const formKey = 'signup-form';

  useEffect(() => {
    const itemStr = localStorage.getItem(formKey);
    if (!itemStr) return;
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(formKey);
    } else {
      if (nameRef.current) nameRef.current.value = item.value.name;
      if (emailRef.current) emailRef.current.value = item.value.email;
    }
  }, []);

  const handleBlur = () => {
    const data = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
    };
    const withExpiry = { value: data, expiry: Date.now() + 900 * 1000 };
    localStorage.setItem(formKey, JSON.stringify(withExpiry));
  };

  const validateInputs = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    let hasError = false;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setResponse('');

    if (!name) {
      setNameError('Enter your name.');
      hasError = true;
    } else if (!name.match(/^[A-Za-z ]+$/)) {
      setNameError('Name should contain only letters.');
      hasError = true;
    }

    if (!email) {
      setEmailError('Please enter your email.');
      hasError = true;
    } else if (
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setEmailError('Invalid email format.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      hasError = true;
    } else if (!password.match(/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
      setPasswordError(
        'Password must contain at least 8 characters and one special symbol.'
      );
      hasError = true;
    }

    if (hasError) return null;
    return { name, email, password };
  };

  const writeData = async () => {
    const formData = validateInputs();
    if (!formData) return;

    const { name, email, password } = formData;
    setPending(true);
    localStorage.setItem('email', email);

    try {
      const res = await fetch(`${url}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setEmailError(data.message || 'Email already exists');
      } else if (res.status === 500) {
        navigate('/auth/server-error');
      } else if (res.status === 400) {
        setEmailError(data.message || 'Invalid email domain');
      } else if (res.status === 200) {
        navigate('/auth/verify');
      } else {
        setResponse('Unknown response from server.');
      }

      localStorage.removeItem(formKey);
    } catch {
      setResponse('Network error! Please try again later.');
    } finally {
      setPending(false);
    }
  };

  const redirect = () => {
    localStorage.removeItem(formKey);
    window.location.href = `${url}/auth/google`;
  };

  return (
    <ProfilerWrapper id="Signup">
      <div className="flex min-h-screen flex-col-reverse items-center justify-center gap-6 bg-[#F9F9FF] px-4 py-8 sm:px-8 lg:flex-row lg:gap-10 lg:px-16 lg:py-12">
        {/* ---- Left Side (Form) ---- */}
        <div className="flex w-full max-w-md flex-col items-center justify-center text-center lg:w-1/2 lg:items-start lg:text-left">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="mb-6 text-gray-600">Start your journey with us 🚀</p>

          {/* Google Signup */}
          <button
            onClick={redirect}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 transition hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="cursor-pointer text-sm text-gray-700">
              Signup with Google
            </span>
          </button>

          {/* Divider */}
          <div className="my-6 flex w-full items-center">
            <div className="h-px flex-grow bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">
              or Sign up with Email
            </span>
            <div className="h-px flex-grow bg-gray-300" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              writeData();
            }}
            className="w-full space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
                onBlur={handleBlur}
                onChange={() => setNameError('')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {nameError && (
                <p className="mt-1 text-sm text-red-600">{nameError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                onBlur={handleBlur}
                onChange={() => setEmailError('')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  ref={passwordRef}
                  onChange={() => setPasswordError('')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <div
                  className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className={`w-full rounded-lg py-2 transition duration-300 ${
                pending
                  ? 'cursor-progress bg-gray-400'
                  : 'cursor-pointer bg-[#474BCA] text-white hover:bg-blue-700'
              }`}
            >
              {pending ? 'Signing up...' : 'Sign Up'}
            </button>

            {response && (
              <p className="mt-4 text-center text-sm font-medium text-red-600">
                {response}
              </p>
            )}
          </form>
        </div>

        <div className="mb-6 flex w-full justify-center lg:mb-0 lg:w-1/2">
          <img
            src="/Pages/Login.png"
            alt="Signup Illustration"
            className="w-full max-w-xs object-contain sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </ProfilerWrapper>
  );
}

export default Signup;
