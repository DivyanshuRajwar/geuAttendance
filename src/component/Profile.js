import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
    const { user } = useContext(AuthContext);

    // If user is null or undefined, show a loading message or fallback UI
    if (!user) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <p>Loading user information...</p>
            </div>
        );
    }

    return (
  <div className="w-full h-full bg-[#CFE9D0] flex justify-center items-center">
    <div className="w-1/2 h-[30rem] p-6 rounded-lg shadow-lg text-gray-800">
      
      {/* User Info Section */}
      <div className="bg-[#FCFCFC] mb-6 p-4 rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-center text-[#3E5A43]">User Info</h2>
      </div>

      {/* User Details Section */}
      <div className="bg-[#FCFCFC] p-6 rounded-lg shadow-sm flex flex-col gap-y-4 text-left">
        <p className="text-lg">
          <strong className="text-[#3E5A43]">First Name:</strong> 
          <span className='ml-3'>{user.firstName}</span>
        </p>
        <p className="text-lg">
          <strong className="text-[#3E5A43]">Last Name:</strong> 
          <span className='ml-3'>{user.lastName}</span>
        </p>
        <p className="text-lg">
          <strong className="text-[#3E5A43]">Username:</strong> 
          <span className='ml-3'>{user.username}</span>
        </p>
        <p className="text-lg">
          <strong className="text-[#3E5A43]">Teacher ID:</strong> 
          <span className='ml-3'>{user.teacherId}</span>
        </p>
        <p className="text-lg">
          <strong className="text-[#3E5A43]">Date of Birth:</strong> 
          <span className='ml-3'>
            {new Date(user.dob).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
        </p>
        <p className="text-lg">
          <strong className="text-[#3E5A43]">Email:</strong> 
          <span className='ml-3'>{user.email}</span>
        </p>
      </div>
    </div>
  </div>
);

    
    
}

export default Profile;
