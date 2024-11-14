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
        <div className='w-full h-full flex justify-center items-center'>
            <div className="w-1/2 h-[30rem] bg-[#FCFCFC] p-6 rounded-lg shadow-md text-gray-800">
                
                <h2 className="text-4xl font-bold mb-6 text-center">User Information</h2>
                
                <div className="flex flex-col gap-y-4 text-left">
                    <p><strong>First Name:</strong> <span className='ml-3'>{user.firstName}</span></p>
                    <p><strong>Last Name:</strong> <span className='ml-3'>{user.lastName}</span></p>
                    <p><strong>Username:</strong><span className='ml-3'>{user.username}</span></p>
                    <p><strong>Teacher ID:</strong><span className='ml-3'>{user.teacherId}</span></p>
                    <p><strong>Date of Birth:</strong><span className='ml-3'>{new Date(user.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}</span></p>
                    <p><strong>Email:</strong><span className='ml-3'>{user.email}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
