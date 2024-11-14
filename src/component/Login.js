import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        usernameOrEmail,
        password,
      };
      const response = await axios.post(
        "http://localhost:3000/teacher-login-form",
        loginData
      );

      // Check if login was successful
      if (response.status === 200) {
        // If login is successful, call login() to update the context state
        console.log(response.userData)
        login(response.data.userData);
        navigate('/profile')
      } else {
        alert("Login Fail");
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      // Check if the error is due to invalid credentials
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Show error message as an alert
      } else {
        // Handle other types of errors (e.g., network issues)
        console.error("Error during login:", error.message);
        alert("An error occurred during login. Please try again.");
      }
      };
  // if (isAuthenticated) {
  //   navigate("/profile");
  // }
}

  return (
    <form
      onSubmit={handleLogin}
      className="w-[40%] max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-4 mx-auto mt-10"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Login
      </h2>

      {/* Email or Username field */}
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

      {/* Password field */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-1/3 py-2 mt-6 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto block"
      >
        Login
      </button>

      {/* Signup Link */}
      <div className="text-center mt-4">
        <span className="text-gray-600">Don't have an account? </span>
        <a href="/signup" className="text-[#45AA40] font-semibold">
          Sign up here
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
