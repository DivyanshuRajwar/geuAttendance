import React, { useState } from 'react';
import axios from 'axios';

function View() {
  const [date, setDate] = useState('');
  const [classId, setClassId] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleClassId = (e) => {
    e.preventDefault();
    let CId = e.target.value.toUpperCase();
    setClassId(CId);
  };
  const handleSubject =(e)=>{
    e.preventDefault();
    let sCode = e.target.value.toUpperCase();
    setSubject(sCode);
  }

  const convertToDbFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); 
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}${month}${year}`;
  };

  const handleAttendance = async (e) => {
    e.preventDefault();
    const formattedDate = convertToDbFormat(date);

    if (!formattedDate || !classId || !subject) {
      console.log('Please fill out all fields.');
      return;
    }

    const AttData = {
      date: formattedDate,
      classId,
      subject,
    };

    try {
      setIsLoading(true); // Start loading
      console.log('Fetching attendance data...');
      console.log(AttData);
      
      // Send GET request with query parameters
      const res = await axios.get('http://localhost:3000/get-attendance', {
        params: AttData,
      });
    
      console.log('Response data:', res.data);
    
      // Handle different status codes
      if (res.status === 200) {
        if (Array.isArray(res.data)) {
          setStudents(res.data); // Update state with fetched data
        } else {
          console.error('Unexpected response format:', res.data);
        }
      } else if (res.status === 404) {
        console.warn(res.data.message); // No attendance data found
      } else {
        console.error('Unexpected status:', res.status);
      }
    } catch (error) {
      console.error("Error in getting Attendance:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center pt-9 ">
      {/* Form Section */}
      <div className="bg-[#FCFCFC] w-[90%] p-8 rounded-lg shadow-lg space-y-6 mx-auto flex flex-col items-center">
        <p className="text-3xl font-semibold text-gray-900">Generate Attendance</p>
        <form className="w-full flex items-center justify-center space-x-5" onSubmit={handleAttendance}>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Class ID (e.g., BCA2D, BTech5E)"
            value={classId}
            onChange={handleClassId}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
          <input
            type="text"
            placeholder="Subject (e.g., Java, C++)"
            value={subject}
            onChange={handleSubject}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
          <button
            type="submit"
            className="w-1/3 py-2 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto"
          >
            Generate
          </button>
        </form>
      </div>

      {/* Display Student Data */}
      <div className="mt-4 bg-[#FCFCFC] w-[90%] p-8 rounded-lg shadow-lg mx-auto flex flex-col items-center space-y-6">
        {/* Headings Row */}
        <div className="w-full flex justify-between text-center font-semibold text-gray-700">
          <span className="w-1/5">Roll No</span>
          <span className="w-1/5">Name</span>
          <span className="w-1/5">Class ID</span>
          <span className="w-1/5">Subject</span>
          <span className="w-1/5">Date</span>
        </div>

        {/* Data Rows */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="w-full flex justify-between text-center text-gray-900   ">
                <span className="w-1/5 text-black ">{student.RollNo}</span>
                <span className="w-1/5">{student.fullName}</span>
                <span className="w-1/5">{student.ClassId}</span>
                <span className="w-1/5">{student.subjectCode}</span>
                <span className="w-1/5">{student.Date}</span>
              </div>
            ))
            

          ) : (
            <div className="text-center text-gray-500">No students found for this criteria.</div>
          )
        )}
      </div>
    </div>
  );
}

export default View;
