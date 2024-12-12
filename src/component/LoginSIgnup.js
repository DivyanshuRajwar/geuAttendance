import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
function LoginSignup() {
  // State for Login
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for Signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Context and navigation
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Generate Teacher ID on component mount
  useEffect(() => {
    const generateTeacherId = () =>
      Math.floor(1000 + Math.random() * 9000).toString();
    setTeacherId(generateTeacherId());
  }, []);

  // Automatically update username
  useEffect(() => {
    setUsername((firstName + lastName).toLowerCase());
  }, [firstName, lastName]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "https://server-vpgh.onrender.com/teacher-login-form",
      //   { usernameOrEmail, password }
      // );
      const response = await axios.post(
        "http://localhost:3000/teacher-login-form",
        { usernameOrEmail, password }
      );

      if (response.status === 200) {
        login(response.data.userData);
        navigate("/profile");
        toast.success("🔑 Welcome back! You've successfully logged in.");

      } else {
        toast.error("🚫 Invalid credentials. Please check your username or password.");
      }
    } catch (error) {
      toast.error("🚫 Invalid credentials. Please check your username or password.");
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const signupData = {
      firstName,
      lastName,
      username,
      teacherId,
      dob,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://server-vpgh.onrender.com/teacher-signup-form",
        signupData
      );
      if (response.status === 201) {
        toast.success("🎉 You're all set! Welcome aboard")
        setToggleLoginSignup(true); 
        
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      // console.error("Signup error:", error);
    //   alert("An error occurred during registration. Please try again.");
    toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  // Toggle between Login and Signup
  const [toggleLoginSignup, setToggleLoginSignup] = useState(true);
  const toggleForm = (event) => {
    event.preventDefault()
    setToggleLoginSignup((prev) => !prev);
    // console.log(toggleLoginSignup);
  };

  return (
    <>
      {toggleLoginSignup ? (
        // Login Form
        <form
          onSubmit={handleLogin}
          className="w-[40%] max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-4 mx-auto mt-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter your email or username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <button
            type="submit"
            className="w-1/3 py-2 mt-6 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto block"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={toggleForm}
              className="text-[#45AA40] font-semibold cursor-pointer"
            >
              Sign up here
            </button>
          </div>
        </form>
      ) : (
        // Signup Form
        <form
          onSubmit={handleSignup}
          className="w-full max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-3 mx-auto "
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Sign Up
          </h2>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1 font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <button
            type="submit"
            className="w-1/2 py-2 mt-6 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto block"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={toggleForm}
              className="text-[#45AA40] font-semibold cursor-pointer"
            >
              Log in here
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginSignup;
