// src/component/Signup.js
import React, { useState, useEffect} from 'react';
import axios from 'axios'
function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [username, setUsername] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Generate a unique 4-digit ID
  useEffect(() => {
    const generateTeacherId = () => {
      return Math.floor(1000 + Math.random() * 9000).toString(); 
    };
    
    setTeacherId(generateTeacherId());
  },[]); 
  useEffect(()=>{
    setUsername((firstName + lastName).toLowerCase());

  },[firstName, lastName])
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
      password
    };
    try {
      const response = await axios.post('http://localhost:3000/teacher-signup-form', signupData);
      console.log(response.data);
      alert("Registration successful! Teacher ID: " + teacherId);
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="w-full max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-4 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
      
      {/* First Name and Last Name */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold text-gray-700">First Name</label>
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
          <label className="block mb-1 font-semibold text-gray-700">Last Name</label>
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

      {/* Email and Date of Birth */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-1 font-semibold text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>
      </div>

      {/* Teacher ID - Username */}
      <div className="flex space-x-4">
        <div className='w-1/2'>
        <label className="block mb-1 font-semibold text-gray-700">Teacher ID</label>
        <input
          type="text"
          value={teacherId}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
        />
        </div>
        <div className='w-1/2'>
        <label className="block mb-1 font-semibold text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
        />
        </div>
       
      </div>

      {/* Password and Confirm Password */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            // minLength="8"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            title="Password must contain at least 8 characters, including letters and numbers"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-1/2 py-2 mt-6 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto block"
      >
        Register
      </button>

      {/* Login Link */}
      <div className="text-center mt-4">
        <span className="text-gray-600">Already have an account? </span>
        <a href="/" className="text-[#45AA40] font-semibold">Login here</a>
      </div>
    </form>
  );
}

export default Signup;
