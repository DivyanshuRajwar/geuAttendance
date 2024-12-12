import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Attendance from './Attendance';
import Document from './Document';
import View from './View';
import { AuthContext } from '../context/AuthContext';
import LoginSIgnup from './LoginSIgnup';

function CenterDiv() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='bg-[#CFE9D0] w-[100%] h-[89%] overflow-y-auto'>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/profile" /> : <Navigate to="/LoginSIgnup" /> }
        />

        {/* Public Routes */}
        <Route path="/LoginSIgnup" element={<LoginSIgnup />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/LoginSIgnup" />}
        />
        <Route
          path="/attendance"
          element={isAuthenticated ? <Attendance /> : <Navigate to="/LoginSIgnup" />}
        />
        <Route
          path="/document"
          element={isAuthenticated ? <Document /> : <Navigate to="/LoginSIgnup" />}
        />
        <Route
          path="/view-attendance"
          element={isAuthenticated ? <View /> : <Navigate to="/LoginSIgnup" />}
        />
      </Routes>
    </div>
  );
}

export default CenterDiv;
