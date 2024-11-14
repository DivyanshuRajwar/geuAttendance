import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Attendance from './Attendance';
import Document from './Document';
import View from './View';
import { AuthContext } from '../context/AuthContext';

function CenterDiv() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='bg-[#CFE9D0] w-[100%] h-[89%] overflow-y-auto'>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/profile" /> : <Navigate to="/login" />}
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/attendance"
          element={isAuthenticated ? <Attendance /> : <Navigate to="/login" />}
        />
        <Route
          path="/document"
          element={isAuthenticated ? <Document /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-attendance"
          element={isAuthenticated ? <View /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default CenterDiv;
