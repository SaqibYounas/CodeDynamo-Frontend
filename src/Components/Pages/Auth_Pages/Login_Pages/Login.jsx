// import { useNavigate } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";
// import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { url } from "./Port";
// import { ProfilerWrapper } from "../../utils/Profiler";

// function Login() {
//   const navigate = useNavigate();

//   const onsubmit = (e) => {
//     e.preventDefault();
//     writeData();
//   };
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const [response, setresponse] = useState();
//   const [pending, setPending] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const formKey = "login-form";

//   useEffect(() => {
//     const itemStr = localStorage.getItem(formKey);
//     if (!itemStr) return;

//     const item = JSON.parse(itemStr);
//     if (Date.now() > item.expiry) {
//       localStorage.removeItem(formKey);
//     } else {
//       if (emailRef.current) emailRef.current.value = item.value.email;
//     }
//   }, []);

//   const handleBlur = () => {
//     const data = {
//       email: emailRef.current?.value || "",
//     };
//     const withExpiry = {
//       value: data,
//       expiry: Date.now() + 900 * 1000,
//     };
//     localStorage.setItem(formKey, JSON.stringify(withExpiry));
//   };

//   const writeData = async () => {
//     const email = emailRef.current.value.trim();
//     const password = passwordRef.current.value.trim();
//     setPasswordError("");
//     setEmailError("");
//     if (email === "") {
//       setEmailError("Please enter your email.");
//       emailRef.current.focus();
//       return;
//     }
//     if (password === "") {
//       setPasswordError("Please enter your password.");
//       passwordRef.current.focus();
//       return;
//     }

//     if (!email.match(/^\S+@\S+\.\S+$/)) {
//       setEmailError("Please enter a valid email address.");
//       emailRef.current.focus();
//       setPending(false);
//       return;
//     }

//     const formData = {
//       email,
//       password,
//     };
//     setPending(true);

//     try {
//       let url2 = `${url}/auth/login`;
//       let response = await fetch(url2, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });
//       let data = await response.json();
//       if (
//         response.status === 400 &&
//         data.message == "Password does not match."
//       ) {
//         setPasswordError(data.message || "Password does not match.");
//       } else if (response.status === 400 && data.message == "Email not found") {
//         setEmailError(data.message || "Email not found");
//       } else if (response.status === 200) {
//         if (data.role === "admin") {
//           navigate("/admin/dashboard");
//           localStorage.removeItem("login-form");
//         } else {
//           navigate("/user/dashboard");
//           localStorage.removeItem("login-form");
//         }
//       } else if (response.status === 500) {
//         setresponse(`Sorry! Server error Try Again`);
//       } else if (
//         response.status === 400 &&
//         data.message ===
//           "This user is registered via Google. Please login with Google."
//       ) {
//         setresponse(data.message);
//       } else if (
//         response.status === 400 &&
//         data.message === "You don't have an account. Please sign up."
//       ) {
//         setresponse(data.message);
//       } else {
//         setresponse("Unknown response from server.");
//       }
//       localStorage.removeItem("formKey");
//     } catch (error) {
//       setresponse("Network error! Please try again later.");
//     }
//     setPending(false);
//   };

//   const redirect = () => {
//     localStorage.removeItem(formKey);
//     window.location.href = `${url}/auth/google`;
//   };

//   return (
//     <ProfilerWrapper id="Login">
//     <>
//       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#E0ECFF] to-[#C4DDF9]">
//         <div className=" bg-slate-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
//           <div className="flex items-center justify-center mb-6 space-x-3">
//             <FaUserCircle title="icon" className="w-8 h-8 text-purple-600 " />

//             <h2 className="text-2xl font-bold text-gray-800">
//               Login to Your Account
//             </h2>
//           </div>
//           <form data-testid="login" onSubmit={onsubmit} className="space-y-4">
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
//                 required
//                 onBlur={handleBlur}
//                 onChange={() => {
//                   setEmailError(""), setresponse("");
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ref={emailRef}
//               />
//               {emailError && (
//                 <p className="text-red-600 text-sm mt-1 font-semibold">
//                   {emailError}
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

//               {/* Input Container for Eye Icon */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="Password"
//                   required
//                   onBlur={handleBlur}
//                   onChange={() => {
//                     setPasswordError("");
//                     setresponse("");
//                   }}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   ref={passwordRef}
//                 />

//                 {/* Eye Icon */}
//                 <div
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>

//               {/* Password Error Message */}
//               {passwordError && (
//                 <p className="text-red-600 text-sm mt-1 font-semibold">
//                   {passwordError}
//                 </p>
//               )}
//             </div>

//             <div className="flex justify-end">
//               <Link
//                 to="/auth/forgotpassword"
//                 className="text-blue-700 hover:underline "
//               >
//                 Reset Password
//               </Link>
//             </div>
//             <button
//               type="submit"
//               disabled={pending}
//               className={`w-full py-2 rounded-lg transition duration-300 ${
//                 pending
//                   ? "bg-gray-400 cursor-progress"
//                   : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
//               }`}
//             >
//               {pending ? "Logging..." : "Login"}
//             </button>
//           </form>
//           <div className="flex items-center my-6">
//             <div className="flex-grow h-px bg-gray-300" />
//             <span className="px-3 text-gray-500 text-sm">or continue with</span>
//             <div className="flex-grow h-px bg-gray-300" />
//           </div>
//           <button
//             onClick={redirect}
//             className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               className="h-5 w-5"
//             />
//             <span className="text-sm text-gray-700 cursor-pointer ">
//               Login with Google
//             </span>
//           </button>
//           {/* Response Message */}
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

// export default Login;
'use client';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { url } from './Port';
import { ProfilerWrapper } from '../../utils/Profiler';

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [response, setresponse] = useState('');
  const [pending, setPending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formKey = 'login-form';

  useEffect(() => {
    const itemStr = localStorage.getItem(formKey);
    if (!itemStr) return;
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(formKey);
    } else {
      if (emailRef.current) emailRef.current.value = item.value.email;
    }
  }, []);

  const handleBlur = () => {
    const data = { email: emailRef.current?.value || '' };
    const withExpiry = { value: data, expiry: Date.now() + 900 * 1000 };
    localStorage.setItem(formKey, JSON.stringify(withExpiry));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    await writeData();
  };

  const writeData = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    setPasswordError('');
    setEmailError('');

    if (!email) {
      setEmailError('Please enter your email.');
      emailRef.current.focus();
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      passwordRef.current.focus();
      return;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setEmailError('Please enter a valid email address.');
      emailRef.current.focus();
      return;
    }

    setPending(true);

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 400 && data.message === 'Password does not match.') {
        setPasswordError(data.message);
      } else if (res.status === 400 && data.message === 'Email not found') {
        setEmailError(data.message);
      } else if (res.status === 200) {
        navigate(
          data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
        );
        localStorage.removeItem(formKey);
      } else {
        setresponse(data.message || 'Unknown server response.');
      }
    } catch (error) {
      setresponse('Network error! Please try again later.');
    } finally {
      setPending(false);
    }
  };

  const redirect = () => {
    localStorage.removeItem(formKey);
    window.location.href = `${url}/auth/google`;
  };

  return (
    <ProfilerWrapper id="Login">
      <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-[#F9F9FF] px-4 sm:px-8 lg:px-16 py-8 lg:py-12 gap-6 lg:gap-10">
        <div className="w-full lg:w-1/2 max-w-md flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login now</h2>
          <p className="text-gray-600 mb-6">Hi, Welcome back 👋</p>

          <button
            onClick={redirect}
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-sm text-gray-700 cursor-pointer ">
              Login with Google
            </span>
          </button>

          <div className="flex items-center my-6 w-full">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">
              or Login with Email
            </span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <form onSubmit={onsubmit} className="space-y-4 w-full">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email id"
                required
                onBlur={handleBlur}
                onChange={() => {
                  setEmailError('');
                  setresponse('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ref={emailRef}
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  required
                  onChange={() => {
                    setPasswordError('');
                    setresponse('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ref={passwordRef}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordError && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <Link
                to="/auth/forgotpassword"
                className="text-blue-700 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={pending}
              className={`w-full py-2 rounded-lg transition duration-300 ${
                pending
                  ? 'bg-gray-400 cursor-progress'
                  : 'bg-[#474BCA] hover:bg-blue-700 text-white cursor-pointer'
              }`}
            >
              {pending ? 'Logging...' : 'Login'}
            </button>

            {response && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  response.toLowerCase().includes('successful')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {response}
              </p>
            )}
          </form>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src="/Pages/Login.png"
            alt="Login Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </ProfilerWrapper>
  );
}

export default Login;
